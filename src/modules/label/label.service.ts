import {ForbiddenException, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from './label.entity';
import { LabelDto } from './dto/label.dto';
import { UsersService } from '../users/users.service';
import {User} from "../users/user.entity";

@Injectable()
export class LabelService {
    constructor( 
        @InjectRepository(Label)
            private labelRepository: Repository<Label>,
            private userService: UsersService
          ) {}

          async createLabel(label: LabelDto, id:number): Promise<Label> {
            const user = await this.userService.getUserById(id)
            if(user.type ==="admin")
            {
                let labelEntity = new Label();
                labelEntity.name = label.name
                const data = await this.labelRepository.save(labelEntity)
            return data;
        }
        else {
            throw  new ForbiddenException("You must be an admin to create labels")
        }
        }
    
        async getLabelById(id: number): Promise<Label | undefined> {
            const data =  await this.labelRepository.findOne(id);
            return data;
        }
    
        async getLabelByName(name: string): Promise<Label | undefined> {
            const data =  await this.labelRepository.findOne({where: {name:name}});
            return data;
        }
    
        async getLabels(): Promise<Label[]> {
            const data =  await this.labelRepository.find();
            return data;
        }
    
        async deleteLabel(user_id: number, label_id:number): Promise<void> {
           
           const user = await this.userService.getUserById(user_id)
           if(user.type ==="admin")
           {
            await this.labelRepository.delete(label_id);
       }
       else {
               throw  new ForbiddenException("You must be an admin to delete labels")
       }
        
    }

    async addLabelImage(label_id:number,user_id:number, image:string): Promise<Label>
    {
        const user = await this.userService.getUserById(user_id)
        if(user.type ==="admin") {
            const data = await this.labelRepository.findOne(label_id);
            data.image = image;
            await this.labelRepository.save(data)
            return data;
        }
        else {
            throw  new ForbiddenException("You must be an admin to add labels images")
        }
    }
}
