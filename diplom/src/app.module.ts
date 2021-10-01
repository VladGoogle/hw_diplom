import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
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

@Module({
  imports: [UsersModule, DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, ModifiersModule, LabelModule, CategoryModule, ProductModule, ModtoprodModule, CardModule, OrderModule, ProductorderModule, ModproductorderModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
