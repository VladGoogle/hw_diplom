import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class TransactionDto {
    @IsNotEmpty()
    source: string;

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    currency:string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    customer_token: string;

    @IsNotEmpty()
    order_id: number;

    @IsNotEmpty()
    card_id: number;
}