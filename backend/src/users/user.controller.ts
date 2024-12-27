import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PassportJwtGuard } from '@src/auth/guards/passport-jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll() {
    return this.userService.getAll();
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(PassportJwtGuard)
  @ApiOperation({ summary: 'Get own user' })
  async getMyUser(@Req() req) {
    return this.userService.getMyUser(req.user);
  }
}
