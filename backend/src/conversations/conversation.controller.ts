import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassportJwtGuard } from '@src/auth/guards/passport-jwt.guard';
import { ConversationDto } from './conversation.dto';
import { ConversationService } from './conversation.service';

@ApiTags('Exemple avec ApiHeader')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('all')
  async getAll() {
    return this.conversationService.getAll();
  }

  @Get()
  @UseGuards(PassportJwtGuard)
  @ApiOperation({ summary: 'Get own conversations' })
  @ApiBearerAuth()
  async getOwn(@Req() request) {
    return this.conversationService.getOwn(request.user);
  }

  @Post()
  async create(@Body() conversationDto: ConversationDto) {
    return this.conversationService.create(conversationDto);
  }
}
