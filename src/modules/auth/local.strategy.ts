import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private  authService: AuthService) {
        super();
    }

    async validate(obj:any): Promise<any>{
        const user = await this.authService.validateUser(obj);

        if (!user) {
         throw new BadRequestException('Invalid user credentials');
        }
        return user;
    }
}