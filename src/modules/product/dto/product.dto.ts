import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class ProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    labelId: number;

    @IsNotEmpty()
    categoryId:number;
}