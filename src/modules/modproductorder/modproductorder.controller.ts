import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { ModToProdToOrderDto } from './dto/modproductorder.dto';
import { ModToProductToOrder } from './modproductorder.entity';
import { ModproductorderService } from './modproductorder.service';

@Controller('users')
export class ModproductorderController {
    constructor(private modprodorderService: ModproductorderService) {}

    @Post('add/modifier/product/order')
    async addModToProductToOrder(@Body () obj:ModToProdToOrderDto) {
        return await this.modprodorderService.addModToProductToOrder(obj)
    }

    @Patch('change/modifier/product/order')
    async changeModToProductToOrder(@Body () mod_id:number, @Param() id) {
        return await this.modprodorderService.changeModForProductOrder(id, mod_id)
    }

    @Get('get/product/order/mods/by/:id')
    async getProductToOrderWithModifiers(@Param() id) {
        return await this.modprodorderService.getOrderProductWithModsById(id)
    }

    @Get('get/product/order/mods/list')
    async getProductsToOrderWithModifiers() {
        return await this.modprodorderService.getOrderProductsWithMods()
    }

    @Delete('delete/product/order/mods')
    async deleteProductsToOrderWithModifiers(@Param() id) {
        return await this.modprodorderService.deleteOrderProductWithMods(id)
    }
}
