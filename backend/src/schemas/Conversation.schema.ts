import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';

@Schema()
export class Conversation {
  // @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true })
  // users: User[];

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
