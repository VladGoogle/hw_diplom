import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class ModToProdToOrderDto {
    @IsNotEmpty()
    totalProductPrice: number;
    
    @IsNotEmpty()
    prodOrder_id: number;

    @IsNotEmpty()
    mod_id: number;
}