import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {LoginUserDto} from "./dtos/login-user.dto";
import {JwtPayload} from "./interfaces/jwt-payload.interface";
import * as bcrypt from 'bcrypt';
import {RegisterUserDto} from "./dtos/register-user.dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    return await this.usersService.create(registerUserDto);
  }

  async validateUserByPassword(loginUserDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(loginUserDto.email);
    const match = await bcrypt.compare(loginUserDto.password, user.password);
    if (!match) {
      throw new NotFoundException('Wrong email or password.');
    }

    return this.createJwtPayload(user);
  }

  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.usersService.getUserByEmail(payload.email);
    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  createJwtPayload(user){
    const data: JwtPayload = {
      email: user.email
    };
    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: process.env.JWT_EXPIRATION,
      token: jwt
    }
  }
}
