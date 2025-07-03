import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 *
 *
 */
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // console.log('====================================');
    // console.log(data);
    // console.log(context);
    // console.log('====================================');
    const request = context.switchToHttp().getRequest();
    // 인터셉터에서 넘겨준 사용자 정보를 반환
    return request.currentUser;
  },
);
