import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { Label } from '../label/label.entity';
import { Modifier } from '../modifier/modifier.entity';
import { ModToProd } from '../modtoprod/modtoprod.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @ManyToOne(type => Label, label => label.products)
    label: Label;

    @RelationId((product: Product) => product.label) // you need to specify target relation
    label_id: number;

    @ManyToOne(type => Category, category => category.products)
    category: Category;

    @RelationId((product: Product) => product.category) // you need to specify target relation
    category_id: number;

    @OneToMany(() => ModToProd, modToProd => modToProd.product)
    public modToProds!: ModToProd[];
  }
