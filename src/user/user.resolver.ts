import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailExistGuard } from './guards/email-exist.guard';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()

export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard, )
  @Query(() => [User], { name: 'users' })
  users() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  user(@CurrentUser() user: User) {
    console.log(user);
  }

  @UseGuards(EmailExistGuard)
  @Mutation(() => User)
  createUser(@Args('userInput') userInput: CreateUserDto) {
    return this.userService.create(userInput);
  }
}
