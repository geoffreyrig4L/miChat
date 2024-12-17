import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@src/schemas/User.schema';
import { UserDto } from '@src/users/user.dto';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { find } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: UserDto): Promise<boolean> {
    const user = await this.findUser(username, false);

    await this.validatePassword(password, user);

    return true;
  }

  private async findUser(identifier: string, byId: boolean = true) {
    const user = await this.userModel.findOne(
      byId ? { _id: identifier } : { username: identifier },
    );

    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  private async validatePassword(password: string, user) {
    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      throw new UnauthorizedException('(Password) User not found');
    }
  }

  async generateToken(username: string) {
    const user = await this.userModel.findOne({ username });

    const payload = { sub: user._id, email: user.email };

    const token = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });

    return {
      token,
      user,
    };
  }

  async signUp(userDto: UserDto): Promise<User> {
    const user = await this.userModel.findOne(
      { username: userDto.username },
      { email: userDto.email },
    );

    if (user) {
      throw new UnauthorizedException('Sign up failed');
    }

    const hash = await bcrypt.hash(userDto.password, 10);

    const newUser = new this.userModel({
      username: userDto.username,
      password: hash,
      email: userDto.email,
    });

    return newUser.save();
  }

  async delete(userId: string, password: string) {
    const user = await this.findUser(userId);
    await this.validatePassword(password, user);
    await this.userModel.deleteOne({ _id: userId });
    return 'User deleted';
  }
}
