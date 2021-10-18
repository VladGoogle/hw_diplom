import {ForbiddenException, Injectable} from '@nestjs/common';
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


export class RefundDto {
    charge_id:string;
    amount:number;
    status:ChargeStatus
}

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
        console.log(customer_token)
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
            currency: transaction.currency,
            customer: transaction.customer_token,
             description:transaction.description
        }).then(console.log);

        const data = await this.transService.createTransaction(transaction)
        return data;
    }

    public async createRefund(refundObj:RefundDto, trans_id:number, user_id:number)
    {
        const user = await this.userService.getUserById(user_id)
        if(user.type ==='admin')
        {
            await stripe.refunds.create({
            charge: refundObj.charge_id,
            amount: refundObj.amount
          }).then(console.log);
          
          const charge = await this.transService.changeTransactionAfterRefundForAdmin(refundObj.status, trans_id, refundObj.amount)
          return charge;
        }
        else {
            await stripe.refunds.create({
                charge: refundObj.charge_id
            }).then(console.log);

            const charge = await this.transService.changeTransactionAfterRefundForCustomer(refundObj.status, trans_id)
            return charge;
        }
    }
     
}
