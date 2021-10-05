import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CardService } from '../card/card.service';
import { TransactionDto } from '../transaction/dto/transaction.dto';
import { ChargeStatus } from '../transaction/transaction.entity';
import { TransactionService } from '../transaction/transaction.service';
import { UsersService } from '../users/users.service';
const stripe = new Stripe('sk_test_51JZVxnLkFhXapQcDocZOJvW6u92pXY4NO7fiw3p05m31lMnSFP0jZVyJyp8R5IbHLWl0QtRzUZlbcmlGc3XwRpZd00dCnp3qc6',
{
    apiVersion: '2020-08-27',
});
const DEFAULT_CURRENCY = 'usd'
const COMPLETED_STATUS = 'succeeded'
const REFUNDED_STATUS = 'refunded'


@Injectable()
export class StripeService {
    constructor(
        private userService: UsersService,
        private cardService: CardService,
        private transService:TransactionService
        ) {}

    public async newCustomer(user_id:number)
    {
        const user = await this.userService.getUserById(user_id)
        await stripe.customers.create({
            name: user.firstName,
            email: user.email,
            phone:user.phone
        }).then(console.log)
    }

    public async newSource (card_id:number,customer_token:string)
    {
        const card = await this.cardService.getCardById(card_id)
        await stripe.customers.createSource(
            customer_token,
            {source: card.external_id}
        ).then(console.log)
    } 

    public async payForOrderWithToken(transaction: TransactionDto){
        
         await stripe.charges.create({
            source: transaction.source,
            amount: transaction.amount,
            currency: DEFAULT_CURRENCY,
            customer: transaction.customer_token
        }).then(console.log);

        const data = await this.transService.createTransaction(transaction)
        return data;
    }

    public async createRefund(charge_id:string, amount:number, trans_id:number, status:ChargeStatus, user_id:number)
    {
        const user = await this.userService.getUserById(user_id)
        if(user.type ==='admin')
        {

        await stripe.refunds.create({
            charge: charge_id,
            amount: amount
          }).then(console.log);
          
          const charge = await this.transService.changeTransactionAfterRefund(status, trans_id, amount)
          return charge;
        }
        else {
            throw 'You must be an admin to refund charges'
        }
    }
     
}
