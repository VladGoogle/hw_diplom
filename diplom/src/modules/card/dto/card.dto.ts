import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class CardDto {
    @IsNotEmpty()
    external_id:number;

    @IsNotEmpty()
    user_id:number;
}