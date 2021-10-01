import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CategoryService {
    constructor( 
        @InjectRepository(Category)
            private userRepository: Repository<Category>,
            private userService: UsersService
          ) {}

          async createCategory(category: CategoryDto, id:number): Promise<Category> {
            const user = await this.userService.getUserById(id)
            if(user.type ==="admin")
            {
            const data = await this.userRepository.create({
                    name: category.name
            })
            return data;
        }
        else {
            throw "You must be an admin to create categories"
        }
        }
    
        async getCategoryById(id: number): Promise<Category | undefined> {
            const data =  await this.userRepository.findOne({ where: { id:id } });
            return data;
        }
    
        async getCategoryByName(name: string): Promise<Category | undefined> {
            const data =  await this.userRepository.findOne({ where: { name:name } });
            return data;
        }
    
        async getCategories(): Promise<Category[]> {
            const data =  await this.userRepository.find();
            return data;
        }
    
        async deleteCategory(user_id: number, category_id:number): Promise<void> {
           
           const user = await this.userService.getUserById(user_id)
           if(user.type ==="admin")
           {
            await this.userRepository.delete(category_id);
       }
       else {
           throw "You must be an admin to delete categories"
       }
    }


}
