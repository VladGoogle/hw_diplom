import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { ModToProdToOrderDto } from './dto/modproductorder.dto';
import { ModToProductToOrder } from './modproductorder.entity';
import { ModproductorderService } from './modproductorder.service';

@Controller()
export class ModproductorderController {
    constructor(private modprodorderService: ModproductorderService) {}

    @Post('modifiers_to_products_to_orders')
    async addModToProductToOrder(@Body () obj:ModToProdToOrderDto) {
        return await this.modprodorderService.addModToProductToOrder(obj)
    }

    @Patch('product_to_order/:prodorder_id/modifiers/:mod_id/change')
    async changeModToProductToOrder(@Param('prodorder_id') prodorder_id:string, @Param('mod_id') mod_id:string) {
        const prodorderId = parseInt(prodorder_id)
        const modId = parseInt(mod_id)
        return await this.modprodorderService.changeModForProductOrder(prodorderId, modId)
    }

    @Get('modifiers_to_products_to_orders/:id')
    async getProductToOrderWithModifiers(@Param('id') id:string) {
        const modprodorderId = parseInt(id)
        return await this.modprodorderService.getOrderProductWithModsById(modprodorderId)
    }

    @Get('modifiers_to_products_to_orders')
    async getProductsToOrderWithModifiers() {
        return await this.modprodorderService.getOrderProductsWithMods()
    }

    @Delete('modifiers_to_products_to_orders/:id')
    async deleteProductsToOrderWithModifiers(@Param('id') id:string) {
        const modprodorderId = parseInt(id)
        return await this.modprodorderService.deleteOrderProductWithMods(modprodorderId)
    }
}
