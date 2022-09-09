import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { ROLES_KEY } from "../strategies/roles.strategy";
import { Reflector } from "@nestjs/core";
import { Role } from "src/user/models/roles.enum";
import { User } from "src/user/models/user.model";
import { UserService } from "src/user/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const authentication: any = this.userService.findOneById((user as User)._id);
    return !user? true: false;
    
    //   return requiredRoles.some(
    //     // (role) => authentication?.roles?.includes(role));
    // }
  }
}