import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The Role of user',
});
