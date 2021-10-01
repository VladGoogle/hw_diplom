import { Module } from '@nestjs/common';
import { ProductorderService } from './productorder.service';

@Module({
  providers: [ProductorderService]
})
export class ProductorderModule {}
