import { Controller, Body, Post, UseGuards, Request,Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))

    @Post('auth/login')
    async login(@Request() req) {
        return await this.authService.login(req.body);
    }

    @Post('auth/signup')
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }
}