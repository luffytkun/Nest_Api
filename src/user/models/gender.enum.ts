import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  MR = 'Ông',
  MRS = 'Bà',
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'The gender of user',
});
