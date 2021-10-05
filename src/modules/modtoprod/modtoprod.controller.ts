
import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put } from '@nestjs/common';
import { ModtoprodService } from './modtoprod.service';
import { ModToProdDto } from './dto/modtoprod.dto';

@Controller('users')
export class ModtoprodController {
    constructor(private modprodService: ModtoprodService) {}

    @Post('add/modifier/product')
    async addModToProduct(@Body () obj:ModToProdDto) {
        return await this.modprodService.addModToProduct(obj)
    }


    @Get('get/products/mods')
    async getProductWithModifiers(@Param() id) {
        return await this.modprodService.getProdWithMods(id)
    }

    @Get('product/get/list/mods')
    async getProductsWithModifiers() {
        return await this.modprodService.getProdsWithMods()
    }
}
