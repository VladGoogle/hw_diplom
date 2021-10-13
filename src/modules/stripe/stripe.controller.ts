import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { TransactionDto } from '../transaction/dto/transaction.dto';
import { ChargeStatus } from '../transaction/transaction.entity';
import { StripeService } from './stripe.service';
import {UsersService} from "../users/users.service";


@Controller('users')
export class StripeController {
    constructor(private stripeService: StripeService) {}

    @Post('create/customer/:id')
    async createCustomer(@Param('id') id) {
        return await this.stripeService.newCustomer(id)
    }

    @Post('create/source/:id')
    async createSource(@Param('id') id, @Body() token:string) {
        return await this.stripeService.newSource(id, token)
    }

    @Post('create/charge')
    async createCharge(@Body() charge:TransactionDto) {
        return await this.stripeService.payForOrderWithToken(charge)
    }

    @Post(':user_id/create/refund/:trans_id')
    async createRefund(@Body() charge_id:string, amount:number, status: ChargeStatus, @Param('user_id') user_id, @Param('trans_id') trans_id) {
        return await this.stripeService.createRefund(charge_id, amount, trans_id,status,user_id)
    }
}
