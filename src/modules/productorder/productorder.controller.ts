import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { ProductOrderDto } from './dto/productorder.dto';
import { ProductOrderService } from './productorder.service';

@Controller()
export class ProductorderController {
    constructor(private productOrderService: ProductOrderService) {}

    @Post('products_to_orders')
    async addProductToOrder(@Body () prod:ProductOrderDto) {
        return await this.productOrderService.addProductToOrder(prod)
    }

    @Patch('products_to_orders/:id/quantity')
    async changeProdOrderQuantity(@Body () quant:number, @Param('id') id:string) {
        const prodorderId = parseInt(id)
        return await this.productOrderService.changeProdQuantity(prodorderId, quant)
    }

    @Get('products_to_orders')
    async getProductsToOrder() {
        return await this.productOrderService.getProductsToOrder()
    }

    @Get('products_to_orders/:id')
    async getProductToOrderById(@Param('id') id:string) {
        const prodorderId = parseInt(id)
        return await this.productOrderService.getProductToOrderById(prodorderId)
    }

    @Delete('products_to_orders/:id')
    async deleteProductToOrder(@Param('id') id:string) {
        const prodorderId = parseInt(id)
        return await this.productOrderService.deleteProductToOrder(prodorderId)
    }


}
