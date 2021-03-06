import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModToProdDto } from './dto/modtoprod.dto';
import { ModToProd } from './modtoprod.entity';


@Injectable()
export class ModtoprodService {
    constructor( 
        @InjectRepository(ModToProd)
            private modtoprodRepository: Repository<ModToProd>
          ) {}

          async addModToProduct(obj: ModToProdDto): Promise<ModToProd> {
                let modprodEntity = new ModToProd()
                    modprodEntity.productId = obj.productId,
                    modprodEntity.modifierId = obj.modifierId
              const data = await this.modtoprodRepository.save(modprodEntity)
              return data;
    }

          async getProdsWithMods(): Promise<ModToProd[]> {
            const result = await this.modtoprodRepository.find({relations:["product", "modifier"]})
            return result;
        }

        async getProdWithMods(id:number): Promise<ModToProd> {
            const result = await this.modtoprodRepository.findOne({id},{relations:["product", "modifier"]})
            return result;
        }

}
