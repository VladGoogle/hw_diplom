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
                const data = this.userRepository.create({
                    quantity: prod.quantity,
                    price:prod.price,
                    modProd_id:prod.modProd_id,
                    modProdOrder_id: prod.modProdToOrder_id
                })
                return data;
          }

          async getProductsToOrder(): Promise<ProductOrder[]> {
            const result = await this.userRepository.find({relations:["modprod", "modtoprodstoorder"]})
            return result;
        }

        async getProdWithMods(id:number): Promise<ProductOrder> {
            const result = await this.userRepository.findOne({id},{relations:["modProd", "modtoprodstoorder"]})
            return result;
        }

        async deleteProdWithMods(id:number): Promise<void> {
            await this.userRepository.delete(id)
        }

        async changeProdQuantity(id:number, quantity:number): Promise<ProductOrder> {
            const data = await this.userRepository.findOne({id},{relations:["modProd", "modtoprodstoorder"]})
            data.quantity = quantity;
            await this.userRepository.save(data)
            return data;
        }

}
