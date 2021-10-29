
import { UsersService } from './users.service';
import { Controller, Body, Post, UseGuards, Request,Req, Get, Param, Delete, Put, Patch } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id) {
        return await this.userService.getUserById(id);
    }

    @Get(':email')
    async getUserByEmail(@Param('email') email:string) {
        return await this.userService.getUserByEmail(email);
    }

    @Delete(':id')
    async removeUserById(@Param('id') id) {
        return await this.userService.deleteUser(id);
    }

    @Patch(':id')
    async updateUser(@Body() user:UserDto, @Param('id') id) {
        return await this.userService.updateUser(user, id);
    }
}
