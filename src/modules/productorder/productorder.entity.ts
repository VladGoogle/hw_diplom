import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { Label } from '../label/label.entity';
import { ModToProductToOrder } from '../modproductorder/modproductorder.entity';
import { ModToProd } from '../modtoprod/modtoprod.entity';
import { Order } from '../order/order.entity';


@Entity()
export class ProductOrder {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    quantity: number;

    @Column()
    price: number;


    @OneToOne(() => ModToProd, (modtoprod: ModToProd) => modtoprod.prodorder)
    modprod: ModToProd;

    @RelationId((prodorder: ProductOrder) => prodorder.modprod) // you need to specify target relation
    modProd_id: number;

     @ManyToOne(() => Order, (order: Order) => order.prodorders)
     order: Order;

     @OneToMany(() => ModToProductToOrder, modToProdToOrder => modToProdToOrder.productorder)
     public modtoprodstoorder!: ModToProductToOrder[];

     @RelationId((prodorder: ProductOrder) => prodorder.modtoprodstoorder) // you need to specify target relation
     modProdOrder_id: number;
}