import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '@src/schemas/Message.schema';
import { Model } from 'mongoose';
import { MessageDto } from './message.dto';
import { User } from '@src/schemas/User.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  getAll(): Promise<Message[] | null> {
    return this.messageModel.find();
  }

  async create({ sender, ...messageDto }: MessageDto) {
    const user = this.userModel.findById(sender);
    if (!user) throw new Error('User not found');
    const newMessage = new this.messageModel({
      sender,
      receiver: messageDto.receiver,
      content: messageDto.content,
    });
    const savedMessage = await newMessage.save();
    await user.updateOne({
      $push: { messages: savedMessage._id },
    });
    return savedMessage;
  }
}
