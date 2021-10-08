import { Module } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { UsersService } from '../users/users.service';

@Module({
  imports:[TypeOrmModule.forFeature([Product]), UsersService],
  providers: [ProductService],
  exports:[ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
