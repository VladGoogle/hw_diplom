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
import { Modifier } from '../modifier/modifier.entity';
import { Product } from '../product/product.entity';
import { ProductOrder } from '../productorder/productorder.entity';
import { Order } from '../order/order.entity';

@Entity()
export class ModToProductToOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductOrder, (prodOrder) => prodOrder.modtoprodstoorder)
  public productorder!: ProductOrder;

  @RelationId((modprodorder: ModToProductToOrder) => modprodorder.productorder) // you need to specify target relation
  prodOrder_id: number;

  @ManyToOne(() => Modifier, (modifier) => modifier.modtoprodstoorder)
  public modifier!: Modifier;

  @RelationId((modprodorder: ModToProductToOrder) => modprodorder.modifier) // you need to specify target relation
  mod_id: number;

  @ManyToOne(() => Order, (order: Order) => order.modprodorders)
  order: Order;

  @Column()
  totalProductPrice: number;
}
