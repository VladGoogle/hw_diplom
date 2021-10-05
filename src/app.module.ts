import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { usersProviders } from './modules/users/users.providers';
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


@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, ModifiersModule, LabelModule, CategoryModule, ProductModule, ModtoprodModule, CardModule, OrderModule, ProductorderModule, ModproductorderModule, TransactionModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
