import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from './label.entity';
import { LabelDto } from './dto/label.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class LabelService {
    constructor( 
        @InjectRepository(Label)
            private userRepository: Repository<Label>,
            private userService: UsersService
          ) {}

          async createLabel(label: LabelDto, id:number): Promise<Label> {
            const user = await this.userService.getUserById(id)
            if(user.type ==="admin")
            {
            const data = await this.userRepository.create({
                name:label.name,
                image:label.image
            })
            return data;
        }
        else {
            throw "You must be an admin to create labels"
        }
        }
    
        async getLabelById(id: number): Promise<Label | undefined> {
            const data =  await this.userRepository.findOne({ where: { id:id } });
            return data;
        }
    
        async getLabelByName(name: string): Promise<Label | undefined> {
            const data =  await this.userRepository.findOne({ where: { name:name } });
            return data;
        }
    
        async getLabels(): Promise<Label[]> {
            const data =  await this.userRepository.find();
            return data;
        }
    
        async deleteLabel(user_id: number, label_id:number): Promise<void> {
           
           const user = await this.userService.getUserById(user_id)
           if(user.type ==="admin")
           {
            await this.userRepository.delete(label_id);
       }
       else {
           throw "You must be an admin to delete labels"
       }
        
    }
}
