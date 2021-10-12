import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./local-auth.guard";

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.body);
  }

  @Post('auth/signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.register(user);
  }
}
