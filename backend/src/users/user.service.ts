import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getAll(): Promise<User[] | null> {
    return this.userModel.find().populate(['messages']);
  }

  getMyUser(userId: string): Promise<User | null> {
    return this.userModel.findOne({ _id: userId });
  }
}
