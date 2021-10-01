import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class ModifierDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;
}