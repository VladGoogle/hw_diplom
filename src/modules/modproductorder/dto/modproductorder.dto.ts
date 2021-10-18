import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class ModToProdToOrderDto {
    @IsNotEmpty()
    totalProductPrice: number;
    
    @IsNotEmpty()
    productorderId: number;

    @IsNotEmpty()
    modifierId: number;
}