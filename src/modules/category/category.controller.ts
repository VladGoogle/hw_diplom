import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller()
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post('users/:id/categories')
    async createCategory(@Body() category:CategoryDto, @Param('id') id:string) {
        const userId = parseInt(id)
        return await this.categoryService.createCategory(category, userId);
    }

    @Get('categories/:id')
    async getCategoryById(@Param('id') id:string) {
        const categoryId = parseInt(id)
        return await this.categoryService.getCategoryById(categoryId)
    }

    @Get('categories/:name')
    async getCategoryByName(@Param('name') name:string) {
        return await this.categoryService.getCategoryByName(name)
    }

    @Get('categories')
    async getCategories() {
        return await this.categoryService.getCategories()
    }

    @Delete('users/:id/categories/:category_id')
    async deleteCategory(@Param('category_id') category_id:string, @Param('id') user_id:string) {
        const userId = parseInt(user_id)
        const categoryId = parseInt(category_id)
        return await this.categoryService.deleteCategory(userId, categoryId)
    }

}
