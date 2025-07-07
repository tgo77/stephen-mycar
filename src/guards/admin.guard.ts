import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { currentUser } = request;
    console.log('====================================');
    console.log(currentUser);
    console.log('====================================');
    if (!currentUser) {
      return false;
    }
    return currentUser.admin;
  }
}
