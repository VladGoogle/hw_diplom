import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../card/card.entity';
import { Product } from '../product/product.entity';
import { ProductOrder } from '../productorder/productorder.entity';
import { Transaction } from '../transaction/transaction.entity';


export enum orderStatus {
    received ='received',
    processing = 'processing',
    ready ='ready'
}
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    description: string;

    @Column()
    totalPrice: number;

    @Column()
    tax: number;

    @Column('text')
    status: orderStatus;
    

    @ManyToOne(() => User, (user:User) => user.orders)
    user: User;

    @RelationId((order: Order) => order.user) // you need to specify target relation
    user_id: number;

    @OneToMany(() => ProductOrder, (productorder:ProductOrder)=>productorder.order)
    prodorders:ProductOrder[]

    @RelationId((order: Order) => order.prodorders) // you need to specify target relation
    prodOrder_id: number;

    @OneToOne(() => Transaction, (transaction: Transaction) => transaction.order)
    transaction: Transaction;
}