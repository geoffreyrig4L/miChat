import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/auth/guards/auth.guard';
import { ConversationDto } from './conversation.dto';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('all')
  async getAll() {
    return this.conversationService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get()
  async getOwn(@Req() request) {
    return this.conversationService.getOwn(request.user);
  }

  @Post()
  async create(@Body() conversationDto: ConversationDto) {
    return this.conversationService.create(conversationDto);
  }
}
