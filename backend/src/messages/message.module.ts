import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from '@src/schemas/Message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { User, UserSchema } from '@src/schemas/User.schema';
import {
  Conversation,
  ConversationSchema,
} from '@src/schemas/Conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
