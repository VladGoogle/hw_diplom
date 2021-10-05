
import { UsersService } from './users.service';
import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get('list')
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get('get/by/:id')
    async getUserById(@Param('id') id) {
        return await this.userService.getUserById(id);
    }

    @Get('get/by/email')
    async getUserByEmail(@Body() email) {
        return await this.userService.getUserById(email);
    }

    @Delete('delete/by/:id')
    async removeUserById(@Param('id') id) {
        return await this.userService.deleteUser(id);
    }

    @Patch('update/by/:id')
    async updateUser(@Body() user:UserDto, @Param('id') id) {
        return await this.userService.updateUser(user, id);
    }
}
