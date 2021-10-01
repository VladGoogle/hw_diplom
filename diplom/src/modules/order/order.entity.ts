import { Table, Column, Model, DataType, HasOne, ForeignKey, BelongsTo, BelongsToMany, HasMany } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Card } from '../card/card.entity';
import { Product } from '../product/product.entity';
import { ProductOrder } from '../productorder/productorder.entity';
import { Transaction } from '../transaction/transaction.entity';

@Table
export class Order extends Model<Order> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @Column({
        type: DataType.STRING
    })
    description: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    totalPrice: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    tax: number;

    @Column({
        type: DataType.ENUM,
        values: ['received', 'processing', 'ready'],
        allowNull: false,
    })
    status: string;
    
    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    user_id: number;

    @ForeignKey(()=>ProductOrder)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    prod_id: number;


    @BelongsTo(()=>User)
    user:User;

    @HasMany(()=>ProductOrder)
    prod:ProductOrder[]

    @HasOne(()=>Transaction)
    transaction:Transaction;
}