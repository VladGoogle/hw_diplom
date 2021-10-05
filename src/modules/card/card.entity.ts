import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, RelationId } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { User } from '../users/user.entity';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    external_id: string;

    @OneToOne(() => User, (user:User) => user.card)
    user: User;

    @RelationId((card: Card) => card.user) // you need to specify target relation
    user_id: number;

    @OneToMany(type => Transaction, transaction => transaction.card)
    transactions: Transaction[];
}