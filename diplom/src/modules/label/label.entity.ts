import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../product/product.entity';

@Table
export class Label extends Model<Label> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique:true
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    image: string;

    @HasMany(()=>Product)
    product:Product[]
}