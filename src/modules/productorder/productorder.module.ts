import { Module } from '@nestjs/common';
import { ProductOrderService } from './productorder.service';
import { ProductorderController } from './productorder.controller';

@Module({
  providers: [ProductOrderService],
  controllers: [ProductorderController]
})
export class ProductorderModule {}
