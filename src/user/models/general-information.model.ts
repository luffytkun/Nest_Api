import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Gender } from './gender.enum';

@Schema({ _id: false })
@ObjectType('GeneralInformation')
export class GeneralInformation {
  @Prop({ type: String, required: true })
  @Field(() => String, { description: 'The surname and middle name of user' })
  surnameAndMiddleName: string;

  @Prop({ type: String, required: true })
  @Field(() => String, { description: 'The name of user' })
  name: string;

  @Prop({ type: String, required: true })
  @Field(() => Gender, {
    description: 'The gender of user',
  })
  gender: Gender;

  @Prop({ type: Date, default: null })
  @Field(() => Date, {
    description: 'The day of birth of user',
    nullable: true,
  })
  dayOfBirth?: Date;

  @Prop({ type: String, default: null })
  @Field(() => String, {
    description: 'The address of user',
    nullable: true,
  })
  address?: string;

  @Prop({ type: String, required: true })
  @Field(() => String, {
    description: 'The phone number of user',
  })
  phoneNumber: string;
}

export const GeneralInformationSchema =
  SchemaFactory.createForClass(GeneralInformation);
