import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Card } from '../card/card.entity';
import { Order } from '../order/order.entity';

export enum UserType {
    admin ='admin',
    customer ='customer'
}
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column('text')
    type: UserType;

    @OneToOne(() => Card, card => card.user)
    card: Card;

    @OneToMany(() => Order, (order:Order) => order.user)
    orders: Order[];
}