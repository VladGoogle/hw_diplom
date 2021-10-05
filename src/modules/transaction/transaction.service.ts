import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChargeStatus, Transaction } from './transaction.entity';
import { TransactionDto } from './dto/transaction.dto';
import { UsersService } from '../users/users.service';
const COMPLETED_STATUS = 'succeeded'
const REFUNDED_STATUS = 'refunded'


@Injectable()
export class TransactionService {

constructor( 
    @InjectRepository(Transaction)
        private userRepository: Repository<Transaction>,
        private userService:UsersService
      ) {}
    
    async createTransaction(pay: TransactionDto): Promise<Transaction> {
        const data = await this.userRepository.create({
            source:pay.source,
            amount:pay.amount,
            status:pay.status,
            currency:pay.currency,
            customer_token:pay.customer_token,
            order_id:pay.order_id,
            card_id:pay.card_id
        });
        return data;
    }

    async getTransactionById(id: number): Promise<Transaction | undefined> {
        const data =  await this.userRepository.findOne({id},{relations:['order', 'card']});
        return data;
    }

    async getTransactions(): Promise<Transaction[]> {
        const data =  await this.userRepository.find({relations:['order', 'card']});
        return data;
    }

    async removeTransaction(id: number): Promise<void> {
       await this.userRepository.delete(id);
    }

    async changeTransactionAfterRefund(status: ChargeStatus, id: number, amount:number): Promise<Transaction>
    {
            const payment = await this.userRepository.findOne({id},{relations:['order', 'card']})
            payment.status = status;
            payment.amount = amount;
            await this.userRepository.save(payment)
            return payment;
        }
    }

