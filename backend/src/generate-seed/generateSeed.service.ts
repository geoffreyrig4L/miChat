import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { User } from '@src/schemas/User.schema';

@Injectable()
export class GenerateSeedService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async seedUsers(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      const fakeUser = new this.userModel({
        email: faker.internet.email(),
        username: faker.internet.username(),
        password: 'a1',
        friendCode: faker.string.numeric({ length: 6 }),
      });
      await fakeUser.save();
    }
  }
}
