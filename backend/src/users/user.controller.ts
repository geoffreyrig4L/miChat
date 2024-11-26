import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  signIn(@Body() userDto: UserDto) {
    return this.userService.get(userDto);
  }

  @Post('sign-up')
  signUp(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }
}
