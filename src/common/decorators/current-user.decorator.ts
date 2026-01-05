import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/jwt/jwt.strategy';

export interface AuthRequest extends Request {
  user: JwtPayload;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest<AuthRequest>().user;
  },
);
