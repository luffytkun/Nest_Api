import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Role } from './roles.enum';

@Schema({ _id: false })
@ObjectType('Authentication')
export class Authentication {
  @Prop({ type: String, required: true })
  @Field(() => String, { description: 'The email of user' })
  email: string;

  @Prop({ type: String, required: true })
  @Field(() => String, { description: 'The password of user' })
  password: string;

  @Prop({ type: String, default: null })
  @Field(() => String, {
    description: 'The avatar image url of user',
    nullable: true,
  })
  avatar?: string;

  @Prop({ type: [String], default: Role.USER })
  @Field(() => [Role], {description: 'The roles of user', })
  roles?: Role[];
  
}

export const AuthenticationSchema =
  SchemaFactory.createForClass(Authentication);
