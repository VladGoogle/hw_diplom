import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionController } from './transaction.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Transaction]), UsersModule],
  providers: [TransactionService],
  exports:[TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule {}
