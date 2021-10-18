import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class CardDto {
    @IsNotEmpty()
    external_id:string;

    @IsNotEmpty()
    userId:number
}