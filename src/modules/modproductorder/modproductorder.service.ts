import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModToProductToOrder } from './modproductorder.entity';
import { ModToProdToOrderDto } from './dto/modproductorder.dto';

@Injectable()
export class ModproductorderService {
    constructor( 
        @InjectRepository(ModToProductToOrder)
            private userRepository: Repository<ModToProductToOrder>
          ) {}

          async addModToProductToOrder(obj: ModToProdToOrderDto): Promise<ModToProductToOrder> {
            const data = this.userRepository.create({
                prodOrder_id:obj.prodOrder_id,
                mod_id:obj.mod_id,
                totalProductPrice:obj.totalProductPrice
            })
            return data;
      }

      async getOrderProductsWithMods(): Promise<ModToProductToOrder[]> {
        const result = await this.userRepository.find({relations:["productOrder", "modifier"]})
        return result;
    }

    async getOrderProductWithModsById(id:number): Promise<ModToProductToOrder> {
        const result = await this.userRepository.findOne({id},{relations:["productOrder", "modifier"]})
        return result;
    }

    async changeModForProductOrder(id:number, mod_id:number): Promise<ModToProductToOrder> {
        const data = await this.userRepository.findOne({id},{relations:["productOrder", "modifier"]})
        data.mod_id = mod_id
        await this.userRepository.save(data)
        return data;
    }

    async deleteOrderProductWithMods(id:number): Promise<void> {
        await this.userRepository.delete(id)
    }

}
