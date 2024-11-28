import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll() {
    return this.userService.getAll();
  }

  @Post('sign-in')
  async signIn(@Body() userDto: UserDto) {
    const findUser = await this.userService.signIn(userDto);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return findUser;
  }

  @Post('sign-up')
  signUp(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }
}
