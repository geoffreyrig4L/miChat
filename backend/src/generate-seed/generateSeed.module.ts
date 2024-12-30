import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@src/schemas/User.schema';
import { GenerateSeedService } from './generateSeed.service';
import {
  Conversation,
  ConversationSchema,
} from '@src/schemas/Conversation.schema';
import { Message, MessageSchema } from '@src/schemas/Message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Conversation.name, schema: ConversationSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [GenerateSeedService],
  exports: [GenerateSeedService],
})
export class GenerateSeedModule {}
