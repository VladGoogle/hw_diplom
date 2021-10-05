import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { ChargeStatus } from '../transaction.entity';

export class TransactionDto {

    source: string;

    amount: number;

    @IsEnum(ChargeStatus)
    status: ChargeStatus;

    currency:string;

    description: string;

    customer_token: string;

    order_id: number;

    card_id: number;
}