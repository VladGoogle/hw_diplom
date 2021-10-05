import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('users')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post('admin/:id/create/category')
    async createCategory(@Body() category:CategoryDto, @Param('id') id) {
        return await this.categoryService.createCategory(category, id);
    }

    @Get('get/category/by/:id')
    async getCategoryById(@Param('id') id) {
        return await this.categoryService.getCategoryById(id)
    }

    @Get('get/category/by/name')
    async getCategoryByName(@Body() name:string) {
        return await this.categoryService.getCategoryByName(name)
    }

    @Get('get/category/list')
    async getCategories() {
        return await this.categoryService.getCategories()
    }

    @Delete('admin/:id/delete/category')
    async deleteCategory(@Body() category_id:number, @Param('id') user_id) {
        return await this.categoryService.deleteCategory(user_id, category_id)
    }

}
