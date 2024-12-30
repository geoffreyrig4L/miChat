import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
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
  @UseGuards(PassportJwtGuard)
  @ApiOperation({ summary: 'Create a conversation with a friend' })
  @ApiBearerAuth()
  async create(@Body() conversationDto: ConversationDto, @Req() request) {
    return this.conversationService.create(conversationDto, request.user);
  }

  @Delete('/:id')
  @UseGuards(PassportJwtGuard)
  @ApiOperation({ summary: 'Delete your conversation' })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  async delete(@Param() conversationId: string, @Req() request) {
    return this.conversationService.delete(conversationId, request.user._id);
  }
}
