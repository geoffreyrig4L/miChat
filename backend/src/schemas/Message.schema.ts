import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';

@Schema()
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: User;
  // sender: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  receiver: User;
  // receiver: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: Date.now() })
  created_at: Date;

  @Prop({ required: true, default: Date.now() })
  updated_at: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
