import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@src/auth/auth.module';
import {
  Conversation,
  ConversationSchema,
} from 'src/schemas/Conversation.schema';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { User, UserSchema } from '@src/schemas/User.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
