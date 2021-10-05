import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put } from '@nestjs/common';


@Controller('users')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('admin/:id/create/product')
    async createProduct(@Body () product:ProductDto, @Param() id) {
        return await this.productService.createProduct(product, id);
    }

    @Put('admin/:id/update/product')
    async updateProduct(@Body () product:ProductDto, prod_id:number, @Param() id) {
        return await this.productService.updateProduct(product, id, prod_id)
    }

    @Get('product/get/by/:id')
    async getProductById(@Param() id) {
        return await this.productService.getProductById(id)
    }

    @Get('product/get/list')
    async getProducts() {
        return await this.productService.getProducts()
    }

    @Delete('admin/:id/delete/product')
    async deleteProduct(@Param() user_id, @Body() prod_id:number) {
        return await this.productService.deleteProduct(user_id, prod_id)
    }

}
