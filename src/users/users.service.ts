import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./interfaces/user.interface";
import {RegisterUserDto} from "../auth/dtos/register-user.dto";
import {Product} from "../products/interfaces/product.interface";

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(registerUserDto: RegisterUserDto) {
    const foundUser = await this.userModel.findOne({email: registerUserDto.email}).exec();
    if (foundUser) {
      throw new BadRequestException(`User with email: ${registerUserDto.email} already exits.`)
    }

    const createdUser = await new this.userModel(registerUserDto);

    return createdUser.save();
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();

    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({email, verified: true});
    if (!user) {
      throw new NotFoundException('Wrong email or password.');
    }

    return user;
  }
}
