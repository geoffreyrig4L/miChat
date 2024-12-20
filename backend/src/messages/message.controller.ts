import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessageDto } from './message.dto';
import { MessageService } from './message.service';
import { PassportJwtGuard } from '@src/auth/guards/passport-jwt.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('all')
  async getAll() {
    return this.messageService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(PassportJwtGuard)
  @ApiOperation({ summary: 'Send message to a friend' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() messageDto: MessageDto, @Req() req) {
    return this.messageService.create(req.user.id, messageDto);
  }
}
