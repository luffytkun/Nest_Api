import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

import { Gender } from '../models/gender.enum';

@InputType()
export class CreateGeneralInformationDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'The surname and middle name of user' })
  surnameAndMiddleName: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'The name of user' })
  name: string;

  @IsEnum(Gender)
  @Field(() => String, {
    description: 'The gender of user',
  })
  gender: Gender;

  @IsDate()
  @IsOptional()
  @Field(() => Date, {
    description: 'The day of birth of user',
    nullable: true,
  })
  dayOfBirth?: Date;

  @IsString()
  @IsOptional()
  @Field(() => String, {
    description: 'The address of user',
    nullable: true,
  })
  address?: string;

  @IsPhoneNumber('VN')
  @IsString()
  @Field(() => String, {
    description: 'The phone number of user',
  })
  phoneNumber: string;
}
