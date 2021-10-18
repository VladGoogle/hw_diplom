import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, RelationId, ManyToMany, ManyToOne } from 'typeorm';
import { Order } from '../order/order.entity';
import { Card } from '../card/card.entity';

export enum ChargeStatus{
    succeeded = 'succeeded',
    refunded = 'refunded'
}

export enum ChargeCurrency{
    USD = 'USD',
    RUB = 'RUB'
}
@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
    

    @Column()
    source: string;


    @Column({nullable:true})
    amount: number;

    @Column('text')
    status: ChargeStatus;

    @Column('text')
    currency: ChargeCurrency;

    @Column()
    description: string;

    @Column()
    customer_token: string;


    @OneToOne(() => Order, (order: Order) => order.transaction)
    order: Order;

    @Column({name: "orderId"})
    @RelationId((transaction: Transaction) => transaction.order) // you need to specify target relation
    orderId: number;

    @ManyToOne(()=> Card, (card:Card) => card.transactions)
    card:Card;

    @Column({name: "cardId"})
    @RelationId((transaction: Transaction) => transaction.card) // you need to specify target relation
    cardId: number;
}