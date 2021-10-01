import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ModToProductToOrder } from '../modproductorder/modproductorder.entity';
import { ModToProd } from '../modtoprod/modtoprod.entity';

@Table
export class Modifier extends Model<Modifier> {
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
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;

    @HasMany(()=>ModToProd)
    product:ModToProd[]

    @HasMany(()=>ModToProductToOrder)
    productOrder:ModToProductToOrder[]
}