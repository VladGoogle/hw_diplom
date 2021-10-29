import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';
const REFUNDED_STATUS = 'refunded'

@Controller()
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Get('transactions/:id')
    async getTransactionById(@Param('id') id:string) {
        const transactionId = parseInt(id)
        return await this.transactionService.getTransactionById(transactionId)
    }

    @Get('transactions')
    async getTransactions() {
        return await this.transactionService.getTransactions()
    }

    @Delete('transactions/:id')
    async removeTransaction(@Param('id') id:string) {
        const transactionId = parseInt(id)
        return await this.transactionService.removeTransaction(transactionId)
    }

}
