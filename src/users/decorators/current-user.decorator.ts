import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // console.log('====================================');
    // console.log(data);
    // console.log(context);
    // console.log('====================================');
    const request = context.switchToHttp().getRequest();
    console.log('====================================');
    console.log(request.session.userId);
    console.log('====================================');
  },
);
