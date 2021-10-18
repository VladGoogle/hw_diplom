import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';
const REFUNDED_STATUS = 'refunded'

@Controller('users')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}

    @Get('get/transaction/by/:id')
    async getTransactionById(@Param('id') id) {
        const transactionId = parseInt(id)
        return await this.transactionService.getTransactionById(transactionId)
    }

    @Get('get/transaction/list')
    async getTransactions() {
        return await this.transactionService.getTransactions()
    }

    @Delete('delete/transaction/by/:id')
    async removeTransaction(@Param('id') id) {
        return await this.transactionService.getTransactions()
    }

}
