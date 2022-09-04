import { Body, Controller, Post, Get, Param } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
    return 'seccesful';
  }

  @Get()
  users() {
    return this.userService.findAll();
  }

  @Get(':email')
  findByEmail(@Param('email') email: string){
    return this.userService.findOneByEmail(email);
  }

}
