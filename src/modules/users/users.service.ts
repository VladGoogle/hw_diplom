import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

constructor( 
    @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    
    async registerUser(user: UserDto): Promise<User> {
        const data = await this.userRepository.create({
            firstName:user.firstName,
            lastName:user.lastName,
            email: user.email,
            password:user.password,
            phone: user.phone,
            type:user.type
        });
        return data;
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        const data =  await this.userRepository.findOne(email);
        return data;
    }

    async getUserById(id: number): Promise<User | undefined> {
        const data =  await this.userRepository.findOne(id);
        return data;
    }

    async getUsers(): Promise<User[]> {
        const data =  await this.userRepository.find();
        return data;
    }

    async deleteUser(id: number): Promise<void> {
       await this.userRepository.delete(id);
    }

    async updateUser(user: UserDto, id:number): Promise<User> {
        const data =  await this.userRepository.findOne(id);
            data.firstName = user.firstName;
            data.lastName = user.lastName;
            data.email = user.email;
            data.password = user.password;
            data.phone = user.phone;
            data.type = user.type;
            await this.userRepository.save(data)

        return data;
    }
    
    
}
