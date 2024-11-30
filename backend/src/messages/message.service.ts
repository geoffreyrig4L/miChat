import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '@src/schemas/Message.schema';
import { Model } from 'mongoose';
import { MessageDto } from './message.dto';
import { User } from '@src/schemas/User.schema';
import { Conversation } from '@src/schemas/Conversation.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(User.name)
    private conversationModel: Model<Conversation>,
  ) {}

  getAll(): Promise<Message[] | null> {
    return this.messageModel.find();
  }

  async create({ sender, conversation, ...messageDto }: MessageDto) {
    const user = this.userModel.findById(sender);
    if (!user) throw new Error('User not found');

    const findConversation = this.conversationModel.findById(conversation);
    if (!findConversation) throw new Error('Conversation not found');

    const newMessage = new this.messageModel({
      sender,
      conversation,
      receiver: messageDto.receiver,
      content: messageDto.content,
    });

    const savedMessage = await newMessage.save();

    await user.updateOne({
      $push: { messages: savedMessage._id },
    });
    await findConversation.updateOne({
      $push: { messages: savedMessage._id },
    });
    return savedMessage;
  }
}
