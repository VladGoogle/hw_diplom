import {Injectable, Inject, ForbiddenException} from '@nestjs/common';
import { Modifier } from './modifier.entity';
import { ModifierDto } from './dto/modifier.dto';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModifiersService {

constructor( 
    @InjectRepository(Modifier)
        private modifierRepository: Repository<Modifier>,
        private userService: UsersService
      ) {}
    
    async createModifier(mod: ModifierDto, id:number): Promise<Modifier> {
        const user = await this.userService.getUserById(id)
        if(user.type ==="admin")
        {
        let modEntity = new Modifier()
            modEntity.name = mod.name,
            modEntity.price= mod.price
            const data = await this.modifierRepository.save(modEntity)
            return data;
        }
        else {
            throw new ForbiddenException("You must be an admin to create modifiers")
        }
    }

    async getModifierById(id: number): Promise<Modifier | undefined> {
        const data =  await this.modifierRepository.findOne(id);
        return data;
    }

    async getModifierByName(name: string): Promise<Modifier | undefined> {
        const data =  await this.modifierRepository.findOne({where:{name}});
        return data;
    }

    async getModifiers(): Promise<Modifier[]> {
        const data =  await this.modifierRepository.find();
        return data;
    }

    async deleteModifier(user_id: number, mod_id:number): Promise<void> {
       
       const user = await this.userService.getUserById(user_id)
       if(user.type ==="admin")
       {
        await this.modifierRepository.delete(mod_id);
   }
   else {
           throw new ForbiddenException("You must be an admin to delete modifiers")
   }
    
}

}
