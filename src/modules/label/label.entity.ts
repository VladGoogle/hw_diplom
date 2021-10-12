import { Entity, Column, PrimaryGeneratedColumn, OneToOne,OneToMany, JoinColumn, RelationId } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Label {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique:true})
    name: string;

    @Column({nullable: true})
    image: string;

    @OneToMany(() => Product, (product:Product) => product.label)
    products: Product[];
}