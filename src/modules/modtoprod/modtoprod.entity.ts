import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, RelationId, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Product } from '../product/product.entity';
import { Modifier } from '../modifier/modifier.entity';
import { ProductOrder } from '../productorder/productorder.entity';

@Entity()
export class ModToProd {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(() => ProductOrder, (prodOrder: ProductOrder) => prodOrder.modprod)
    prodorder: ProductOrder;

    @ManyToOne(() => Product, product => product.modToProds)
    public product!: Product;

    @RelationId((modtoprod: ModToProd) => modtoprod.product) // you need to specify target relation
    prod_id: number;

    @ManyToOne(() => Modifier, modifier => modifier.modToProds)
    public modifier!: Modifier;

    @RelationId((modtoprod: ModToProd) => modtoprod.modifier) // you need to specify target relation
    mod_id: number;
}