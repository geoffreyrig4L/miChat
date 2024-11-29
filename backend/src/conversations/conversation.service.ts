import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Conversation } from 'src/schemas/Conversation.schema';
import { ConversationDto } from './conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) {}

  getAll(): Promise<Conversation[] | null> {
    return this.conversationModel.find();
  }

  getOwn(id: string): Promise<Conversation[] | null> {
    const objectId = new Types.ObjectId(id);
    return this.conversationModel.aggregate([
      {
        $match: {
          users: objectId,
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
        $addFields: {
          interlocutor: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$participants',
                  as: 'participant',
                  cond: { $ne: ['$$participant._id', objectId] },
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

  create(conversationDto: ConversationDto): Promise<Conversation> {
    const conversation = new this.conversationModel(conversationDto);
    return conversation.save();
  }
}
