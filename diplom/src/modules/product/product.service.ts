import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { UsersService } from '../users/users.service';
import { QueryBuilder } from 'typeorm';
import { Label } from '../label/label.entity';
import { Category } from '../category/category.entity';
import { User } from '../users/user.entity';
import { isDataType } from 'sequelize-typescript';

@Injectable()
export class ProductService {

constructor( 
    @InjectRepository(Product)
        private userRepository: Repository<Product>,
        private userService: UsersService
      ) {}
    
      async createProduct(prod: ProductDto, id:number): Promise<Product> {
        const user = await this.userService.getUserById(id)
        if(user.type ==="admin")
        {
        const data = await this.userRepository.create({
            name:prod.name,
            price:prod.price,
            description:prod.description,
            label_id: prod.label_id,
            category_id:prod.category_id
        })
        return data;
    }
    else {
        throw "You must be an admin to create products"
    }
    }


    async getProductById(id: number): Promise<Product> {
        const data = await this.userRepository.findOne({id}, {relations:["label", "category"]})
        return data;
    }

    async getProducts(): Promise<Product[]> {
        const result = await this.userRepository.find({relations:["label", "category"]})
        return result;
    }

    async deleteProduct(id: number): Promise<void> {
        const user = await this.userService.getUserById(id)
        if(user.type ==="admin")
        {
            await this.userRepository.delete(id);
        }
        else {
            throw "You must be an admin to delete droducts"
        }
    }

    async updateProduct(user: ProductDto, id:number): Promise<Product> {
        const data =  await this.userRepository.findOne({ where: { id:id } });
            data.name = user.name;
            data.price = user.price;
            data.description = user.description;
            data.label_id = user.label_id;
            data.category_id = user.category_id;
            await this.userRepository.save(data)
        return data;
    }
    
    
}
