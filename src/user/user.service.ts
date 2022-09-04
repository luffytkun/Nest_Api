import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    return this.userModel.find();
  }

  async findOneById(_id: MongooseSchema.Types.ObjectId) {
    const existingUser = await this.userModel.findOne({ _id }).populate('cart');

    if (!existingUser) {
      throw new NotFoundException(`User _id ${_id} not found`);
    }

    return this.sanitizeUser(existingUser);
  }

  async findOneByEmail(email: string) {
    const existingUser = await this.userModel.findOne({
      email: email,
    });

    if (!existingUser) {
      throw new NotFoundException(`User email ${email} not found`);
    }

    return existingUser;
  }

  async create(userInput: CreateUserDto) {
    const newUser = new this.userModel(userInput);
    await newUser.save();

    return this.findOneById(newUser._id);
  }

  // Return user object without password
  sanitizeUser(user: UserDocument) {
    const sanitized = user.toObject();
    delete sanitized['password'];

    return sanitized;
  }
}
