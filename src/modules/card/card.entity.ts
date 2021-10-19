import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, RelationId } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { User } from '../users/user.entity';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    external_id: string;

    @OneToOne(() => User, user=> user.card)
    @JoinColumn({name: "userId"})
    user: User;

    @Column({name: "userId"})
    @RelationId((card: Card) => card.user) // you need to specify target relation
    userId: number;

    @OneToMany(type => Transaction, transaction => transaction.card)
    transactions: Transaction[];
}