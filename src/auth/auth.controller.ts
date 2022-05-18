import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginUserDto} from "./dtos/login-user.dto";
import {RegisterUserDto} from "./dtos/register-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Res() response, @Body() registerUserDto: RegisterUserDto) {
    try {
      const newUser = await this.authService.registerUser(registerUserDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'User has been registered successfully',
        newUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('login')
  async login(@Res() response, @Body() loginUserDto: LoginUserDto) {
    try {
      const jwt = await this.authService.validateUserByPassword(loginUserDto);

      return response.status(HttpStatus.OK).json({
        message: 'User login successfully',
        jwt,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
