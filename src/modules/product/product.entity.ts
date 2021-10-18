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

    @ManyToOne(() => Label, (label:Label) => label.products)
    label: Label;


    @Column({name: "labelId"})
    @RelationId((product: Product) => product.label) // you need to specify target relation
    labelId: number;

    @ManyToOne(() => Category, (category:Category) => category.products)
    category: Category;


    @Column({name: "categoryId"})
    @RelationId((product: Product) => product.category) // you need to specify target relation
    categoryId: number;

    @OneToMany(() => ModToProd, (modToProd:ModToProd) => modToProd.product)
    public modToProds!: ModToProd[];
  }
