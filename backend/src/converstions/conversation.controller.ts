import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConversationDto } from './conversation.dto';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('all')
  async getAll() {
    return this.conversationService.getAll();
  }

  @Get(':id')
  async getOwn(@Param('id') id: string) {
    return this.conversationService.getOwn(id);
  }

  @Post()
  async create(@Body() conversationDto: ConversationDto) {
    return this.conversationService.create(conversationDto);
  }
}
