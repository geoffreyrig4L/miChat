import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@src/schemas/User.schema';
import { UserDto } from '@src/users/user.dto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: UserDto): Promise<boolean> {
    const user = await this.userModel.findOne({
      username,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      throw new UnauthorizedException('User not found');
    }

    return true;
  }

  async generateToken(username: string) {
    const user = await this.userModel.findOne({ username });

    const token = this.jwtService.sign(
      { sub: user._id },
      { expiresIn: '1d', secret: process.env.JWT_SECRET },
    );

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
}
