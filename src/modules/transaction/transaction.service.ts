import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChargeStatus, Transaction } from './transaction.entity';
import { TransactionDto } from './dto/transaction.dto';
import { UsersService } from '../users/users.service';



@Injectable()
export class TransactionService {

constructor(
    @InjectRepository(Transaction)
        private transRepository: Repository<Transaction>,
        private userService:UsersService
      ) {}

    async createTransaction(pay: TransactionDto): Promise<Transaction> {
        let transactionEntity = new Transaction()
            transactionEntity.source= pay.source,
            transactionEntity.amount= pay.amount,
            transactionEntity.status= pay.status,
            transactionEntity.currency= pay.currency,
                transactionEntity.description = pay.description,
            transactionEntity.customer_token= pay.customer_token,
            transactionEntity.orderId= pay.orderId,
            transactionEntity.cardId= pay.cardId
        const data = await this.transRepository.save(transactionEntity)
        return data;
        }

    async getTransactionById(id: number): Promise<Transaction | undefined> {
        const data =  await this.transRepository.findOne({id},{relations:['order', 'card']});
        return data;
    }

    async getTransactions(): Promise<Transaction[]> {
        const data =  await this.transRepository.find({relations:['order', 'card']});
        return data;
    }

    async removeTransaction(id: number): Promise<void> {
       await this.transRepository.delete(id);
    }

    async changeTransactionAfterRefundForAdmin(status: ChargeStatus, id: number, amount:number): Promise<Transaction>
    {
            const payment = await this.transRepository.findOne({id},{relations:['order', 'card']})
            payment.status = status;
            payment.amount = amount;
            await this.transRepository.save(payment)
            return payment;
        }

    async changeTransactionAfterRefundForCustomer(status: ChargeStatus, id: number): Promise<Transaction>
    {
        const payment = await this.transRepository.findOne({id},{relations:['order', 'card']})
        payment.status = status;
        await this.transRepository.save(payment)
        return payment;
    }
    }

