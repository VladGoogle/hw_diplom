import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { HasOne } from 'sequelize-typescript';
import { Transaction } from 'src/modules/transaction/transaction.entity';
import { orderStatus } from '../order.entity';


export class OrderDto {
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    totalPrice: number;

    @IsNotEmpty()
    @IsEnum(orderStatus)
    status: orderStatus;

    @IsNotEmpty()
    tax:number;

    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    prodOrder_id: number;

}