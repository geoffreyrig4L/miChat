import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '@src/users/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() userDto: UserDto) {
    return this.authService.signIn(userDto);
  }

  @Post('sign-up')
  signUp(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }
}
