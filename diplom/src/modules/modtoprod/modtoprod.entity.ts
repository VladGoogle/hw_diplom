import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, HasOne, } from 'sequelize-typescript';
import { Product } from '../product/product.entity';
import { Modifier } from '../modifier/modifier.entity';
import { ProductOrder } from '../productorder/productorder.entity';

@Table
export class ModToProd extends Model<ModToProd> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    prod_id: number;

    @ForeignKey(() => Modifier)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    mod_id: number;

    @BelongsTo(()=>Product)
    product:Product;

    @BelongsTo(()=>Modifier)
    modifier:Modifier;

    @HasOne(()=>ProductOrder)
    orderProd:ProductOrder;
}