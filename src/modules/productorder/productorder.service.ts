import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrderDto } from './dto/productorder.dto';
import { ProductOrder } from './productorder.entity';


@Injectable()
export class ProductOrderService {
    constructor( 
        @InjectRepository(ProductOrder)
            private userRepository: Repository<ProductOrder>
          ) {}

          async addProductToOrder(prod: ProductOrderDto): Promise<ProductOrder> {
               let prodOrderEntity = new ProductOrder()
                    prodOrderEntity.quantity = prod.quantity;
                    prodOrderEntity.price =prod.price;
                    prodOrderEntity.modtoprodId =prod.modtoprodId
              const data = await  this.userRepository.save(prodOrderEntity)
              return data;
    }

          async getProductsToOrder(): Promise<ProductOrder[]> {
            const result = await this.userRepository.find({relations:["modprod"]})
            return result;
        }

        async getProductToOrderById(id:number): Promise<ProductOrder> {
            const result = await this.userRepository.findOne({where:{id:id}, relations:["modprod"]})
            return result;
        }

        async deleteProductToOrder(id:number): Promise<void> {
            await this.userRepository.delete(id)
        }

        async changeProdQuantity(id:number, quantity:number): Promise<ProductOrder> {
            const data = await this.userRepository.findOne(id)
            data.quantity = quantity;
            await this.userRepository.save(data)
            return data;
        }

}
