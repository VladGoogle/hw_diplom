import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  exports:[OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
