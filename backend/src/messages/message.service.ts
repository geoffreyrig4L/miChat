import { HttpException, Injectable } from '@nestjs/common';
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
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) {}

  getAll(): Promise<Message[] | null> {
    return this.messageModel.find();
  }

  async create({ sender, receiver, conversation, ...messageDto }: MessageDto) {
    const findSender = await this.userModel.findById(sender);
    if (!findSender) throw new HttpException('Sender not found', 404);

    const findReceiver = await this.userModel.findById(receiver);
    if (!findReceiver) throw new HttpException('Receiver not found', 404);

    const findConversation =
      await this.conversationModel.findById(conversation);
    if (!findConversation)
      throw new HttpException('Conversation not found', 404);

    const newMessage = new this.messageModel({
      conversation,
      sender,
      receiver,
      ...messageDto,
    });

    const savedMessage = await newMessage.save();

    await findConversation.updateOne({
      $push: { messages: savedMessage._id },
    });
    await findSender.updateOne({
      $push: { messages: savedMessage._id },
    });
    return savedMessage;
  }
}
