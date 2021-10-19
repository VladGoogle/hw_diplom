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
  @JoinColumn({ name: 'productorderId' })
  public productorder!: ProductOrder;

  @Column({name: "productorderId"})
  @RelationId((modprodorder: ModToProductToOrder) => modprodorder.productorder) // you need to specify target relation
  productorderId: number;

  @ManyToOne(() => Modifier, (modifier) => modifier.modtoprodstoorder)
  @JoinColumn({ name: 'modifierId' })
  public modifier!: Modifier;

  @Column({name: "modifierId"})
  @RelationId((modprodorder: ModToProductToOrder) => modprodorder.modifier) // you need to specify target relation
  modifierId: number;

  @ManyToOne(() => Order, (order: Order) => order.modprodorders)
  order: Order;

  @Column()
  totalProductPrice: number;
}
