import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConversationModule } from './conversations/conversation.module';
import { MessageModule } from './messages/message.module';

@Module({
  imports: [
    UserModule,
    MessageModule,
    AuthModule,
    ConversationModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,
    ),
  ],
})
export class AppModule {}
