
import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put } from '@nestjs/common';
import { ModtoprodService } from './modtoprod.service';
import { ModToProdDto } from './dto/modtoprod.dto';

@Controller()
export class ModtoprodController {
    constructor(private modprodService: ModtoprodService) {}

    @Post('products/:prod_mod/modifiers/:mod_id')
    async addModToProduct(@Body () obj:ModToProdDto) {
        return await this.modprodService.addModToProduct(obj)
    }


    @Get('products/modifiers/:id')
    async getProductWithModifiers(@Param('id') id:string) {
        const modprodId = parseInt(id)
        return await this.modprodService.getProdWithMods(modprodId)
    }

    @Get('products/modifiers')
    async getProductsWithModifiers() {
        return await this.modprodService.getProdsWithMods()
    }
}
