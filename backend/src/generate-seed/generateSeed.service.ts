import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { faker } from '@faker-js/faker';
import { User } from '@src/schemas/User.schema';
import { Conversation } from '@src/schemas/Conversation.schema';
import { Message } from '@src/schemas/Message.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GenerateSeedService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  async emptyDb(): Promise<void> {
    await this.userModel.deleteMany({});
    await this.conversationModel.deleteMany({});
    await this.messageModel.deleteMany({});
  }

  async seedUsers(count: number): Promise<void> {
    const password = await bcrypt.hash('aaa', 10);

    const jojo = new this.userModel({
      email: 'jojo@gmail.com',
      username: 'jojo',
      password,
      friendCode: faker.string.numeric({ length: 6 }),
    });

    await jojo.save();

    const rhum = new this.userModel({
      email: 'rom@gmail.com',
      username: 'rom',
      password,
      friendCode: faker.string.numeric({ length: 6 }),
    });

    await rhum.save();

    for (let i = 0; i < count; i++) {
      const fakeUser = new this.userModel({
        email: faker.internet.email(),
        username: faker.internet.username(),
        password,
        friendCode: faker.string.numeric({ length: 6 }),
      });
      await fakeUser.save();
    }
  }

  async seedConversationWithMessages(): Promise<void> {
    await this.seedConversationToCreators('jojo');
    await this.seedConversationToCreators('rom');

    const users = await this.userModel.find();

    for (const user of users) {
      const usersWithoutUser = users.filter((u) => u._id !== user._id);
      const randomUser =
        usersWithoutUser[Math.floor(Math.random() * usersWithoutUser.length)];

      const fakeConversation = new this.conversationModel({
        users: [user._id, randomUser._id],
      });

      await fakeConversation.save();

      await this.seedMessages(fakeConversation, user._id, randomUser._id);
    }
  }

  async seedMessages(
    conv: any,
    userId1: Types.ObjectId,
    userId2: Types.ObjectId,
  ) {
    let messages = [];

    for (let i = 0; i < 10; i++) {
      const fakeMessage = new this.messageModel({
        content: faker.lorem.sentence(),
        sender: userId1,
        receiver: userId2,
        conversation: conv._id,
      });
      await fakeMessage.save();

      const fakeAnswer = new this.messageModel({
        content: faker.lorem.sentence(),
        sender: userId2,
        receiver: userId1,
        conversation: conv._id,
      });
      await fakeAnswer.save();

      messages.push(fakeMessage._id, fakeAnswer._id);
    }

    await conv.updateOne({ $push: { messages: { $each: messages } } });
  }

  async seedConversationToCreators(creatorUsername: string) {
    const users = await this.userModel.find();
    const creator = users.find((u) => u.username === creatorUsername);

    const usersWithoutCreator = users.filter((u) => u._id !== creator._id);

    for (const user of usersWithoutCreator) {
      const fakeConversation = new this.conversationModel({
        users: [creator._id, user._id],
      });

      await fakeConversation.save();

      await this.seedMessages(fakeConversation, creator._id, user._id);
    }
  }
}
