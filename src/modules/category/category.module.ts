import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryController } from './category.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Category]), UsersModule],
  providers: [CategoryService],
  exports:[CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
