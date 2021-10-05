import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '../user.entity';


export class UserDto {
    
    firstName: string;
    
    lastName: string;
    
    @IsEmail()
    email: string;

    
    @MinLength(6)
    password: string;

    phone:string;

    @IsNotEmpty()
    @IsEnum(UserType)
    type:UserType;
}