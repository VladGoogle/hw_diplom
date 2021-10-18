import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import {ChargeCurrency, ChargeStatus} from '../transaction.entity';

export class TransactionDto {

    source: string;

    amount: number;

    @IsEnum(ChargeStatus)
    status: ChargeStatus;

    @IsEnum(ChargeCurrency)
    currency:ChargeCurrency;

    description: string;

    customer_token: string;

    orderId: number;

    cardId: number;
}