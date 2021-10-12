import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import {IsNotEmpty} from "class-validator";

export class LoginDto {
  id:string;
  email:string;
  password:string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(obj:LoginDto): Promise<any> {
    const user = await this.userService.getUserByEmail(obj.email)
    if (user && user.password === obj.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto) {
    const payload = { email: user.email, id: parseInt(user.id)};
    const userObj = await this.userService.getUserByEmail(user.email)
    const isValid = await bcrypt.compare(user.password, userObj.password)
    if(!isValid) {
      throw new BadRequestException('User credentials invalid')
    }
    const access_token = this.jwtService.sign(payload)
    return {
      user, access_token
    };
  }

  public async register(user:UserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
      const createdUser = await this.userService.registerUser({
        ...user,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
     console.log(error)
    }

  }

 private validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
