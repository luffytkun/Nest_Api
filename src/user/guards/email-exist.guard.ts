import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';

@Injectable()
export class EmailExistGuard implements CanActivate {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const email = context.getArgByIndex(1).userInput.authentication.email;
    const isExisted = await this.userModel.findOne({
      'authentication.email': email,
    });

    if (isExisted) {
      throw new ConflictException('User email already exist');
    }

    return true;
  }
}
