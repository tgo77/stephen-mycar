import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';

const fakeUser = {
  roles: ['ADMIN', 'MANAGER', 'OWNER', 'MODERATOR', 'GUEST'],
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private _reflector: Reflector) {
    console.log('====================================');
    console.log(this._reflector);
    console.log('====================================');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('====================================');
    console.log(`ROLE'S GUARD`);
    console.log(request.currentUser);
    console.log('====================================');

    const requireRoles = this._reflector.get(Roles, context.getHandler());
    console.log('====================================');
    console.log(requireRoles);
    console.log('====================================');
    const is = requireRoles.every((requireRole) =>
      fakeUser.roles.includes(requireRole),
    );
    console.log('====================================');
    console.log(is);
    console.log('====================================');

    return true;
  }
}
