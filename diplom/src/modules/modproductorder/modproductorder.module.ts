import { Module } from '@nestjs/common';
import { ModproductorderService } from './modproductorder.service';

@Module({
  providers: [ModproductorderService]
})
export class ModproductorderModule {}
