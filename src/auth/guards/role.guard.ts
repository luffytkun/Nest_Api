import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ROLES_KEY } from '../decorator/role.decorator';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user/models/roles.enum';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { log } from 'console';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAll<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const auth: any = this.userService.findOneById(user._id);

    return requiredRoles.some((role) => {
      auth?.roles?.includes(role);
      log(role);
    });
  }
}
