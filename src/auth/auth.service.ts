import * as bcrypt from 'bcrypt';

import { BadGatewayException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(user: User) {
    const payload = {
      email: user.authentication.email,
      sub: user._id,
      roles: user.roles
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);

    const valid = await bcrypt.compare(pass, user.authentication.password);

    if (!valid) {
      throw new BadGatewayException('Password incorrect');
    }

    return this.usersService.sanitizeUser(user);
  }
}
