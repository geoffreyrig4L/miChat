import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessageDto } from './message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('all')
  async getAll() {
    return this.messageService.getAll();
  }

  //TODO add token verification
  // @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() messageDto: MessageDto) {
    return this.messageService.create(messageDto);
  }
}
