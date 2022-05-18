import {Body, Controller, Get, HttpStatus, Post, Res, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthGuard} from "@nestjs/passport";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getUsers(@Res() response) {
    try {
      const users = await this.usersService.getAllUsers();

      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        users,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
