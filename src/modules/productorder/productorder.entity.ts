import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  RelationId,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
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
  @JoinColumn({ name: 'modtoprodId' })
  modprod: ModToProd;


  @Column({name:'modtoprodId'})
  @RelationId((prodorder: ProductOrder) => prodorder.modprod) // you need to specify target relation
  modtoprodId: number;

  @ManyToOne(() => Order, (order: Order) => order.prodorders)
  order: Order;

  @OneToMany(
    () => ModToProductToOrder,
    (modToProdToOrder) => modToProdToOrder.productorder,
  )
  public modtoprodstoorder!: ModToProductToOrder[];
}
