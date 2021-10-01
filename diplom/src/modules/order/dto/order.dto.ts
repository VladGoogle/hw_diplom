import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { HasOne } from 'sequelize-typescript';
import { Transaction } from 'src/modules/transaction/transaction.entity';

export class OrderDto {
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    totalPrice: number;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    tax:number;

    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    prodOrder_id: number;

    @HasOne(()=>Transaction)
    transaction:Transaction;
}