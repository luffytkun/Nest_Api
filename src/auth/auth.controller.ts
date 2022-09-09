import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/user/models/user.model';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/user/models/roles.enum';
import { RolesGuard } from './guards/roles.guard';
import { HasRoles } from './strategies/roles.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Req() req: Request) {
    const { accessToken } = await this.authService.signIn(req.user as User);

    return {
      result: {
        accessToken,
        currentUser: req.user,
      },
    };
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    return this.userService.findOneById((req.user as User)._id);
  }

}
