import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { ProductOrderDto } from './dto/productorder.dto';
import { ProductOrderService } from './productorder.service';

@Controller('users')
export class ProductorderController {
    constructor(private productOrderService: ProductOrderService) {}

    @Post('add/product/order')
    async addProductToOrder(@Body () prod:ProductOrderDto) {
        return await this.productOrderService.addProductToOrder(prod)
    }

    @Patch('change/quantity/product/order/:id')
    async changeProdOrderQuantity(@Body () quant:number, @Param('id') id:string) {
        const prodorderId = parseInt(id)
        return await this.productOrderService.changeProdQuantity(prodorderId, quant)
    }

    @Get('get/products/order')
    async getProductsToOrder() {
        return await this.productOrderService.getProductsToOrder()
    }

    @Get('get/product/order/by/id/:id')
    async getProductToOrderById(@Param('id') id:string) {
        const prodorderId = parseInt(id)
        return await this.productOrderService.getProductToOrderById(prodorderId)
    }

    @Delete('delete/product/order')
    async deleteProductToOrder(@Param('id') id:string) {
        const prodorderId = parseInt(id)
        return await this.productOrderService.deleteProductToOrder(prodorderId)
    }


}
