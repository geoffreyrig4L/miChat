import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getAll(): Promise<User[] | null> {
    return this.userModel.find();
  }

  signIn(userDto: UserDto): Promise<User | null> {
    return this.userModel
      .findOne({ username: userDto.username, password: userDto.password })
      .exec();
  }

  create(userDto: UserDto) {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }
}
