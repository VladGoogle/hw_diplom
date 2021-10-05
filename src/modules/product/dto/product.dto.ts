import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class ProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    label_id: number;

    @IsNotEmpty()
    category_id:number;
}