import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { Card } from '../card/card.entity';
import { Order } from '../order/order.entity';

@Table
export class User extends Model<User> {
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
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.ENUM,
        allowNull: false,
    })
    phone: string;

    @Column({
        type: DataType.ENUM,
        values: ['customer', 'admin'],
        allowNull: false,
    })
    type: string;

    @HasOne(()=>Card)
    card:Card;

    @HasMany(()=>Order)
    order:Order;

}