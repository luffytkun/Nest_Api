import { Module, forwardRef } from '@nestjs/common';
import { User, UserSchema } from './models/user.model';

import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    // forwardRef(() => CartModule),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
