import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getAll(): Promise<User[] | null> {
    return this.userModel.find();
  }

  getMyUser(userId: string): Promise<User | null> {
    return this.userModel.findOne({ _id: userId });
  }

  async updateMyUser(userId: string, user: UserDto): Promise<User> {
    const findUser = await this.userModel.findOne({ _id: userId });
    if (!findUser) throw new Error('User not found');

    const match = await bcrypt.compare(user.password, findUser.password);
    if (!match) throw new UnauthorizedException('Password not match');

    const updateUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        username: user.username,
      },
      { new: true },
    );
    if (!updateUser) throw new Error('Error occurred during modification');

    return updateUser;
  }
}
