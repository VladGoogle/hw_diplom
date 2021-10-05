import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class LabelDto {
    @IsNotEmpty()
    name: string;

    image: string;
}