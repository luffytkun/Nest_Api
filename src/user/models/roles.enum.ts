import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The Role of user',
});
