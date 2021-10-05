import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class ProductOrderDto {
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    modProd_id: number;

    modProdToOrder_id: number;
}