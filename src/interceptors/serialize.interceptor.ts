import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

interface ClassConstructor {
  new (...args: any[]): {};
}

export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    //const response = context.switchToHttp().getResponse();
    // console.log('====================================');
    // console.log('01', context);
    // console.log('02', handler);
    // console.log('====================================');
    console.log('====================================');
    console.log(`SerializeInterceptor::intercept()`, request.user);
    console.log('====================================');

    return handler.handle().pipe(
      map((data: any) => {
        console.log('====================================');
        console.log('03', data);
        console.log('====================================');
        // response.setHeader('Authorization', 'Bearer ' + data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
