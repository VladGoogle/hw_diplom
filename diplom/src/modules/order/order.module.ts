import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
