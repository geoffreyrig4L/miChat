import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { AuthService } from './auth.service';
import { UserDto } from '@src/users/user.dto';

@Controller('auth')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @UseGuards(PassportLocalGuard)
  signIn(@Body() userDto: UserDto) {
    return this.authService.generateToken(userDto.username);
  }

  @Post('sign-up')
  signUp(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }
}
