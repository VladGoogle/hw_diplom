import { Module } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  providers: [ProductService],
  exports:[ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
