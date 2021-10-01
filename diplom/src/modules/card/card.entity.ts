import { Table, Column, Model, DataType, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Transaction } from '../transaction/transaction.entity';
import { User } from '../users/user.entity';

@Table
export class Card extends Model<Card> {
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
    external_id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique:true
    })
    user_id: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Transaction)
    transaction: Transaction;
}