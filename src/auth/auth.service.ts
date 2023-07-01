import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(email: string, password: string) {
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPw });
    const createdUser = await newUser.save();
    return createdUser.id as string;
  }

  async loginUser(email: string, password: string): Promise<[string, string]> {
    const existingUser = await this.userModel.findOne({ email });

    if (!existingUser) {
      throw new BadRequestException("Couldn't find a user with this email");
    }

    const isEqual = await bcrypt.compare(password, existingUser.password);
    if (!isEqual) {
      throw new BadRequestException('Incorrect password');
    }

    const authToken = await this.jwtService.signAsync(
      { userId: existingUser.id },
      { expiresIn: '1h' },
    );
    return [authToken, existingUser.id];
  }
}
