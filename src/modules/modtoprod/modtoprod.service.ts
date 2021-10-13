import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModToProdDto } from './dto/modtoprod.dto';
import { ModToProd } from './modtoprod.entity';


@Injectable()
export class ModtoprodService {
    constructor( 
        @InjectRepository(ModToProd)
            private userRepository: Repository<ModToProd>
          ) {}

          async addModToProduct(obj: ModToProdDto): Promise<ModToProd> {
                let modprodEntity = new ModToProd()
                    modprodEntity.prod_id = obj.prod_id,
                    modprodEntity.mod_id = obj.mod_id
              const data = await this.userRepository.save(modprodEntity)
              return data;
    }

          async getProdsWithMods(): Promise<ModToProd[]> {
            const result = await this.userRepository.find({relations:["product", "modifier"]})
            return result;
        }

        async getProdWithMods(id:number): Promise<ModToProd> {
            const result = await this.userRepository.findOne({id},{relations:["product", "modifier"]})
            return result;
        }

}
