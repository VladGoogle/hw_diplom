import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, HasMany, } from 'sequelize-typescript';
import { Category } from '../category/category.entity';
import { Label } from '../label/label.entity';
import { ModToProductToOrder } from '../modproductorder/modproductorder.entity';
import { ModToProd } from '../modtoprod/modtoprod.entity';
import { Order } from '../order/order.entity';


@Table
export class ProductOrder extends Model<ProductOrder> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    quantity: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;

    @ForeignKey(() => ModToProd)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    modProd_id: number;

    @ForeignKey(() => ModToProductToOrder)
    @Column({
        type: DataType.INTEGER,
    })
    modProdOrder_id: number;

     @BelongsTo(() => ModToProd)
     modProd: ModToProd;

     @BelongsTo(()=>Order)
     order:Order;

     @BelongsTo(()=>ModToProductToOrder)
     modProdOrder:ModToProductToOrder;

     @HasMany(()=>ModToProductToOrder)
     modifier:ModToProductToOrder[];
}