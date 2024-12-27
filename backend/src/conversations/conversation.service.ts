import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation } from 'src/schemas/Conversation.schema';
import { ConversationDto } from './conversation.dto';
import { User } from '@src/schemas/User.schema';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  getAll(): Promise<Conversation[] | null> {
    return this.conversationModel.find().populate(['users']);
  }

  getOwn(userId: string): Promise<Conversation[] | null> {
    const objectUserId = new Types.ObjectId(userId);
    return this.conversationModel.aggregate([
      {
        $match: {
          users: objectUserId,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'participants',
        },
      },
      {
        $lookup: {
          from: 'messages',
          localField: 'messages',
          foreignField: '_id',
          as: 'messages',
        },
      },
      {
        $addFields: {
          interlocutor: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$participants',
                  as: 'participant',
                  cond: { $ne: ['$$participant._id', objectUserId] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $project: {
          users: 0,
          participants: 0,
        },
      },
    ]);
  }

  async create(
    conversationDto: ConversationDto,
    user: User,
  ): Promise<Conversation> {
    if (user.friendCode === conversationDto.friendCode)
      throw new ConflictException(
        "You can't create a conversation with yourself",
      );

    const interlocutor = await this.userModel.findOne({
      friendCode: conversationDto.friendCode,
    });
    if (!interlocutor) throw new NotFoundException('Interlocutor not found');

    const conversationIsExists = await this.conversationModel.findOne({
      users: { $all: [user, interlocutor._id] },
    });
    if (conversationIsExists)
      throw new ConflictException('Conversation already exists');

    const conversation = new this.conversationModel({
      users: [user, interlocutor._id],
    });
    const savedConversation = await conversation.save();
    return savedConversation;
  }

  async delete(_id: string, user: User): Promise<String> {
    const conversation = await this.conversationModel.findOne({
      _id: new Types.ObjectId(_id),
    });
    if (!conversation) throw new NotFoundException('Conversation not found');

    if (!conversation.users.includes(user))
      throw new NotFoundException(
        'You are not allowed to delete this conversation',
      );
    await this.conversationModel.deleteOne({ _id: new Types.ObjectId(_id) });
    return 'Conversation deleted';
  }
}
