import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      if (data === 'id') {
        return request.user?.sub;
      }
      return request.user[data];
    }
    return request.user;
  },
);
