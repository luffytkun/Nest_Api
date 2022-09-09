import * as bcrypt from 'bcrypt';

import { Authentication, AuthenticationSchema } from './authentication.model';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  GeneralInformation,
  GeneralInformationSchema,
} from './general-information.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType('User')
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: AuthenticationSchema,
    ref: Authentication.name,
    required: true,
  })
  @Field(() => Authentication, {
    description: 'The authentication information of user',
  })
  authentication: Authentication;

  @Prop({
    type: GeneralInformationSchema,
    ref: GeneralInformation.name,
    required: true,
  })
  @Field(() => GeneralInformation, {
    description: 'The general information of user',
  })
  generalInformation: GeneralInformation;

}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('authentication.password')) {
      return next();
    }

    const hashed = await bcrypt.hash(this['authentication']['password'], 10);
    this['authentication']['password'] = hashed;

    return next();
  } catch (err) {
    return next(err);
  }
});
