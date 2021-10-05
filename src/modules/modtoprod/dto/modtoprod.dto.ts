import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class ModToProdDto {
    @IsNotEmpty()
    prod_id: number;

    @IsNotEmpty()
    mod_id: number;
}