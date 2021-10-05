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
    async changeProdOrderQuantity(@Body () quant:number, @Param('id') id) {
        return await this.productOrderService.changeProdQuantity(id, quant)
    }

    @Get('get/products/order')
    async getProductsToOrder() {
        return await this.productOrderService.getProductsToOrder()
    }

    @Get('get/product/order/by/:id')
    async getProductToOrderById(@Param('id') id) {
        return await this.productOrderService.getProdWithMods(id)
    }

    @Delete('delete/product/order')
    async deleteProductToOrder(@Param('id') id) {
        return await this.productOrderService.deleteProdWithMods(id)
    }


}
