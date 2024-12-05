import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '@src/schemas/User.schema';
import { UserDto } from '@src/users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userDto: UserDto) {
    const user = await this.userModel.findOne({
      username: userDto.username,
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const match = await bcrypt.compare(userDto.password, user.password);

    if (!match) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { user: user._id };
    const token = this.jwtService.sign(payload, {
      expiresIn: '6h',
      secret: process.env.SECRET_KEY,
    });

    return {
      token,
      user,
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
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
