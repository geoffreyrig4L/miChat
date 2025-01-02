import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PassportJwtGuard } from '@src/auth/guards/passport-jwt.guard';
import { User } from '@src/schemas/User.schema';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

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

  @Put('')
  @ApiBearerAuth()
  @UseGuards(PassportJwtGuard)
  @ApiOperation({ summary: 'Update own user' })
  async updateMyUser(@Req() req, @Body() userDto: UserDto): Promise<User> {
    return this.userService.updateMyUser(req.user, userDto);
  }
}
