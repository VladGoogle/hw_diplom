import {Injectable, Inject, BadRequestException, ForbiddenException} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductService {

constructor( 
    @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private userService: UsersService
      ) {}
    
      async createProduct(prod: ProductDto, id:number): Promise<Product> {
          const user = await this.userService.getUserById(id)
          if (user.type === "admin") {
              let prodEntity = new Product()
                  prodEntity.name = prod.name,
                  prodEntity.price = prod.price,
                  prodEntity.description = prod.description,
                  prodEntity.labelId = prod.labelId,
                  prodEntity.categoryId = prod.categoryId
              const data = await this.productRepository.save(prodEntity)
              console.log(data)
              return data;
          } else {
              throw new ForbiddenException("You must be an admin to create products")
          }
      }


    async getProductById(id: number): Promise<Product> {
        console.log(id)
        const data = await this.productRepository.findOne( {where:{id:id}, relations:["label", "category"]})
        //console.log(data)
        return data;
    }


    async getProducts(): Promise<Product[]> {
        const result = await this.productRepository.find({relations:["label", "category"]})
        return result;
    }

    async deleteProduct(user_id: number, prod_id:number): Promise<void> {
        const user = await this.userService.getUserById(user_id)
        if(user.type ==="admin")
        {
            await this.productRepository.delete(prod_id);
        }
        else {
            throw new ForbiddenException("You must be an admin to delete products")
        }
    }

    async updateProduct(product: ProductDto, user_id:number, prod_id:number): Promise<Product> {
        const user = await this.userService.getUserById(user_id)
        if(user.type==="admin")
        {
            const data =  await this.productRepository.findOne(prod_id);
                        data.name = product.name;
                        data.price = product.price;
                        data.description = product.description;
                        data.labelId = product.labelId;
                        data.categoryId = product.categoryId;
                        await this.productRepository.save(data)
                    return data;
        }
        else {
            throw new ForbiddenException("You must be an admin to update products")
        }
    }
    
    
}
