import { Table, Column, Model, DataType, HasMany, JoinTable } from 'sequelize-typescript';
import { Label } from '../label/label.entity';
import { Product } from '../product/product.entity';

@Table
export class Category extends Model<Category> {
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

    @HasMany(()=>Product)
    product:Product[]
}