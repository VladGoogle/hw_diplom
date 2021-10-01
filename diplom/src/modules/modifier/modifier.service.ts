import { Injectable, Inject } from '@nestjs/common';
import { Modifier } from './modifier.entity';
import { ModifierDto } from './dto/modifier.dto';
import { UsersService } from '../users/users.service';
import { USER_REPOSITORY } from '../../core/constants';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModifiersService {

constructor( 
    @InjectRepository(Modifier)
        private userRepository: Repository<Modifier>,
        private userService: UsersService
      ) {}
    
    async createModifier(mod: ModifierDto, id:number): Promise<Modifier> {
        const user = await this.userService.getUserById(id)
        if(user.type ==="admin")
        {
        const data = await this.userRepository.create({
            name:mod.name,
            price:mod.price
        });
        return data;
    }
    else {
        throw "You must be an admin to create modifiers"
    }
    }

    async getModifierById(id: number): Promise<Modifier | undefined> {
        const data =  await this.userRepository.findOne({ where: { id:id } });
        return data;
    }

    async getModifierByName(name: string): Promise<Modifier | undefined> {
        const data =  await this.userRepository.findOne({ where: { name:name } });
        return data;
    }

    async getModifiers(): Promise<Modifier[]> {
        const data =  await this.userRepository.find();
        return data;
    }

    async deleteModifier(user_id: number, mod_id:number): Promise<void> {
       
       const user = await this.userService.getUserById(user_id)
       if(user.type ==="admin")
       {
        await this.userRepository.delete(mod_id);
   }
   else {
       throw "You must be an admin to delete modifiers"
   }
    
}

    /*async updateUser(user: UserDto, id:number): Promise<User> {
            const data =  await this.userRepository.update({
                firstName:user.firstName,
                lastName:user.lastName,
                email: user.lastName,
                password:user.password,
                phone: user.phone,
                type:user.type
            }, )
            return data;
    }*/
    
    
}
