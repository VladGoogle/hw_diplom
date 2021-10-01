import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, HasOne, } from 'sequelize-typescript';
import { Modifier } from '../modifier/modifier.entity';
import { ProductOrder } from '../productorder/productorder.entity';

@Table
export class ModToProductToOrder extends Model<ModToProductToOrder> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    

    @ForeignKey(() => ProductOrder)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    prodOrder_id: number;


    @ForeignKey(() => Modifier)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    mod_id: number;


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    totalProductPrice: number;

    @BelongsTo(()=>ProductOrder)
    productOrder:ProductOrder;

    @BelongsTo(()=>Modifier)
    modifier:Modifier;

    @HasOne(()=>ProductOrder)
    prodOrder: ProductOrder;
}