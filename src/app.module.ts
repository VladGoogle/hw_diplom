import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ModifiersModule } from './modules/modifier/modifier.module';
import { LabelModule } from './modules/label/label.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { ModtoprodModule } from './modules/modtoprod/modtoprod.module';
import { CardModule } from './modules/card/card.module';
import { OrderModule } from './modules/order/order.module';
import { ProductorderModule } from './modules/productorder/productorder.module';
import { ModproductorderModule } from './modules/modproductorder/modproductorder.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { Connection } from 'typeorm';
import { Card } from './modules/card/card.entity';
import { Category } from './modules/category/category.entity';
import { Label } from './modules/label/label.entity';
import { Modifier } from './modules/modifier/modifier.entity';
import { Order } from './modules/order/order.entity';
import { Product } from './modules/product/product.entity';
import { ProductOrder } from './modules/productorder/productorder.entity';
import { ModToProd } from './modules/modtoprod/modtoprod.entity';
import { ModToProductToOrder } from './modules/modproductorder/modproductorder.entity';
import { Transaction } from './modules/transaction/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'db_user',
      password: 'db_password',
      database: 'pg_users',
      entities: [
        User,
        Card,
        Category,
        Label,
        Modifier,
        Order,
        Product,
        ProductOrder,
        ModToProd,
        ModToProductToOrder,
        Transaction,
      ],
      migrationsTableName: 'custom_migration_table',
      migrations: ['migration/*.ts'],
      cli: {
        migrationsDir: 'migration',
      },
    }),
    UsersModule,
    AuthModule,
    ModifiersModule,
    LabelModule,
    CategoryModule,
    ProductModule,
    ModtoprodModule,
    CardModule,
    OrderModule,
    ProductorderModule,
    ModproductorderModule,
    TransactionModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
