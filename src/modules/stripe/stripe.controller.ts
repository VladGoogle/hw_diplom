import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { TransactionDto } from '../transaction/dto/transaction.dto';
import { ChargeStatus } from '../transaction/transaction.entity';
import {RefundDto, StripeService} from './stripe.service';
import {UsersService} from "../users/users.service";


@Controller('users')
export class StripeController {
    constructor(private stripeService: StripeService) {}

    @Post('create/customer/:id')
    async createCustomer(@Param('id') id:string) {
        const userId = parseInt(id)
        return await this.stripeService.newCustomer(userId)
    }

    @Post('create/:token/source/:card_id')
    async createSource(@Param('card_id') card_id:string, @Param('token') token:string) {
        const cardId = parseInt(card_id)
        return await this.stripeService.newSource(cardId, token)
    }

    @Post('create/charge')
    async createCharge(@Body() charge:TransactionDto) {
        return await this.stripeService.payForOrderWithToken(charge)
    }

    @Post(':user_id/refund/:trans_id')
    async createRefund(@Body() refundObj:RefundDto, @Param('user_id') user_id:string, @Param('trans_id') trans_id:string) {
        const userId = parseInt(user_id)
        const transId = parseInt(trans_id)
        return await this.stripeService.createRefund(refundObj, transId, userId)
    }
}
