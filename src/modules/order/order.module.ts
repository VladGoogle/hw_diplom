import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Order]), UsersModule],
  providers: [OrderService],
  exports:[OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
