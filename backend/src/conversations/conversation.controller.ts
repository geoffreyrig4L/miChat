import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ConversationDto } from './conversation.dto';
import { ConversationService } from './conversation.service';
import { PassportJwtGuard } from '@src/auth/guards/passport-jwt.guard';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('all')
  async getAll() {
    return this.conversationService.getAll();
  }

  @Get()
  @UseGuards(PassportJwtGuard)
  async getOwn(@Req() request) {
    return this.conversationService.getOwn(request.user);
  }

  @Post()
  async create(@Body() conversationDto: ConversationDto) {
    return this.conversationService.create(conversationDto);
  }
}
