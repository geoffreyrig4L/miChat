import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';
import { Conversation } from './Conversation.schema';

@Schema()
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  sender: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  receiver: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  })
  conversation: Conversation;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
