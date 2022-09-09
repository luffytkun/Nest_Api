import { Field, InputType } from '@nestjs/graphql';

import { CreateAuthenticationDto } from './create-authentication.dto';
import { CreateGeneralInformationDto } from './create-general-information.dto';
import { Type } from 'class-transformer';

@InputType()
export class CreateUserDto {
  @Type(() => CreateAuthenticationDto)
  @Field(() => CreateAuthenticationDto, {
    description: 'The authentication information of user',
  })
  authentication: CreateAuthenticationDto;

  @Type(() => CreateGeneralInformationDto)
  @Field(() => CreateGeneralInformationDto, {
    description: 'The general information of user',
  })
  generalInformation: CreateGeneralInformationDto;
}
