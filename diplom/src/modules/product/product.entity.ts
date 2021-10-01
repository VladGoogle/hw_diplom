import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, HasMany, } from 'sequelize-typescript';
import { Category } from '../category/category.entity';
import { Label } from '../label/label.entity';
import { ModToProd } from '../modtoprod/modtoprod.entity';
import { Order } from '../order/order.entity';

@Table
export class Product extends Model<Product> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @ForeignKey(() => Label)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    label_id: number;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    category_id: number;

     @BelongsTo(() => Label)
     label: Label;

     @BelongsTo(() => Category)
     category: Category;

     @HasMany(()=>ModToProd)
     modifier:ModToProd[]
}