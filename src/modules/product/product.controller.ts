import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put } from '@nestjs/common';


@Controller()
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('users/:id/products')
    async createProduct(@Body () product:ProductDto, @Param('id') id:string) {
        const userId = parseInt(id)
        return await this.productService.createProduct(product, userId);
    }

    @Put('users/:user_id/products/:prod_id')
    async updateProduct(@Body () product:ProductDto, @Param('user_id') user_id:string, @Param('prod_id') prod_id:string) {
        const userId = parseInt(user_id)
        const prodId = parseInt(prod_id)
        return await this.productService.updateProduct(product, userId, prodId)
    }

    @Get('products/:id')
    async getProductById(@Param('id') id:string) {
        const prod_id = parseInt(id)
        return await this.productService.getProductById(prod_id)
    }

    @Get('products')
    async getProducts() {
        return await this.productService.getProducts()
    }

    @Delete('users/:user_id/products/:prod_id')
    async deleteProduct(@Param('user_id') user_id:string, @Param('prod_id') prod_id:string) {
        const userId = parseInt(user_id)
        const prodId = parseInt(prod_id)
        return await this.productService.deleteProduct(userId, prodId)
    }

}
