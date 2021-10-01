import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionDto } from './dto/transaction.dto';
import { UsersService } from '../users/users.service';


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
            description:pay.description,
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

    async changeTransactionStatus(status: string, user_id: number, id: number): Promise<Transaction>
    {
        const user = await this.userService.getUserById(user_id)
        if(user.type ==='admin')
        {
            const payment = await this.userRepository.findOne({id},{relations:['order', 'card']})
            payment.status = status;
            await this.userRepository.save(payment)
            return payment;
        }
        else {
            throw "You must be an admin to update transaction status"
        }
    }
    
}
