import {Injectable, Inject, BadRequestException, ForbiddenException} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
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
          if (user.type === "admin") {
              let prodEntity = new Product()
                  prodEntity.name = prod.name,
                  prodEntity.price = prod.price,
                  prodEntity.description = prod.description,
                  prodEntity.label_id = prod.label_id,
                  prodEntity.category_id = prod.category_id
              const data = await this.userRepository.save(prodEntity)
              console.log(data)
              return data;
          } else {
              throw new ForbiddenException("You must be an admin to create products")
          }
      }


    async getProductById(id: number): Promise<Product> {
        console.log(id)
        const data = await this.userRepository.findOne( {where:{id:id}, relations:["label", "category"]})
        //console.log(data)
        return data;
    }


    async getProducts(): Promise<Product[]> {
        const result = await this.userRepository.find({relations:["label", "category"]})
        return result;
    }

    async deleteProduct(user_id: number, prod_id:number): Promise<void> {
        const user = await this.userService.getUserById(user_id)
        if(user.type ==="admin")
        {
            await this.userRepository.delete(prod_id);
        }
        else {
            throw new ForbiddenException("You must be an admin to delete products")
        }
    }

    async updateProduct(product: ProductDto, user_id:number, prod_id:number): Promise<Product> {
        const user = await this.userService.getUserById(user_id)
        if(user.type==="admin")
        {
            const data =  await this.userRepository.findOne(prod_id);
                        data.name = product.name;
                        data.price = product.price;
                        data.description = product.description;
                        data.label_id = product.label_id;
                        data.category_id = product.category_id;
                        await this.userRepository.save(data)
                    return data;
        }
        else {
            throw new ForbiddenException("You must be an admin to update products")
        }
    }
    
    
}
