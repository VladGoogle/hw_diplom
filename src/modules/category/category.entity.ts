import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, RelationId, ManyToOne, ManyToMany } from 'typeorm';
import { Label } from '../label/label.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique:true})
    name: string;

    @OneToMany(() => Product, (product:Product) => product.category)
    products: Product[];
}