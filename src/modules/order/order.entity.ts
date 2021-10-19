import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../card/card.entity';
import { Product } from '../product/product.entity';
import { ProductOrder } from '../productorder/productorder.entity';
import { Transaction } from '../transaction/transaction.entity';
import {ModToProductToOrder} from "../modproductorder/modproductorder.entity";


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

    @Column()
    isMods: boolean;

    @ManyToOne(() => User, (user:User) => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({name: "userId"})
    @RelationId((order: Order) => order.user) // you need to specify target relation
    userId: number;


    @OneToMany(() => ProductOrder, (productorder:ProductOrder)=>productorder.order)
    @JoinColumn({ name: 'productorderId' })
    prodorders:ProductOrder[]


    @Column({name: "productorderId", nullable:true})
    @RelationId((order: Order) => order.prodorders) // you need to specify target relation
    productorderId: number;


    @OneToMany(() => ModToProductToOrder, (modprodorder:ModToProductToOrder)=>modprodorder.order)
    @JoinColumn({name: "modtoproducttoorderId"})
    modprodorders:ModToProductToOrder[]


    @Column({name: "modtoproducttoorderId", nullable:true})
    @RelationId((order: Order) => order.modprodorders) // you need to specify target relation
    modtoproducttoorderId: number;

    @OneToOne(() => Transaction, (transaction: Transaction) => transaction.order)
    transaction: Transaction;
}