import { Module } from '@nestjs/common';
import { ProductOrderService } from './productorder.service';
import { ProductorderController } from './productorder.controller';
import { ProductOrder } from './productorder.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ProductOrder])],
  controllers: [ProductorderController],
  providers: [ProductOrderService],
  exports:[ProductOrderService]
})
export class ProductorderModule {}
