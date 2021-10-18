import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class ModToProdDto {
    @IsNotEmpty()
    productId: number;

    @IsNotEmpty()
    modifierId: number;
}