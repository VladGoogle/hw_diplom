import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { ModToProductToOrder } from '../modproductorder/modproductorder.entity';
import { ModToProd } from '../modtoprod/modtoprod.entity';

@Entity()
export class Modifier {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique:true})
    name: string;

    @Column()
    price: number;

    @OneToMany(() => ModToProd, modToProd => modToProd.modifier)
    public modToProds!: ModToProd[];

    @OneToMany(() => ModToProductToOrder, modToProdToOrder => modToProdToOrder.modifier)
    public modtoprodstoorder!: ModToProductToOrder[];
}