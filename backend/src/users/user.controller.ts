import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  signIn(@Body() userDto: UserDto): void {
    console.log(userDto);
    this.userService.get();
  }

  @Post('sign-up')
  signUp(@Body() userDto: UserDto): void {
    console.log(userDto);
    this.userService.create();
  }
}
