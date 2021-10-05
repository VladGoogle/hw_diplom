import { Module } from '@nestjs/common';
import { ModproductorderService } from './modproductorder.service';
import { ModproductorderController } from './modproductorder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModToProductToOrder } from './modproductorder.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ModToProductToOrder])],
  providers: [ModproductorderService],
  controllers: [ModproductorderController]
})
export class ModproductorderModule {}
