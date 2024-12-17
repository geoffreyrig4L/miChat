import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { UserDto } from '@src/users/user.dto';
import { AuthService } from './auth.service';
import { DeleteAccountDto } from './dtos/deleteAccount.dto';
import { PassportJwtGuard } from './guards/passport-jwt.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';

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

  @UseGuards(PassportJwtGuard)
  @Delete('delete')
  delete(@Req() request, @Body() deleteAccountDto: DeleteAccountDto) {
    return this.authService.delete(request.user.id, deleteAccountDto.password);
  }
}
