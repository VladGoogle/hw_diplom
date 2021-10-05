import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class CategoryDto {
    @IsNotEmpty()
    name: string;
}