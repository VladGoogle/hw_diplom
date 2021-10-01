import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, HasOne, } from 'sequelize-typescript';
import { Order } from '../order/order.entity';
import { Card } from '../card/card.entity';

@Table
export class Transaction extends Model<Transaction> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    source: string;


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    amount: number;

    @Column({
        type: DataType.ENUM,
        values: ['completed', 'refunded'],
        allowNull: false,
    })
    status: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    currency: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    customer_token: string;

    @ForeignKey(()=>Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    order_id: number;

    @ForeignKey(()=>Card)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    card_id: number;

    @BelongsTo(()=>Order)
    order:Order;

    @BelongsTo(()=>Card)
    card:Card;
}