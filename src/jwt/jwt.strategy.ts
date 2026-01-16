import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from 'src/modules/users/user.entity';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'super-secret-key',
    });
  }

  validate(payload: {
    sub: string;
    email: string;
    role: UserRole;
  }): JwtPayload {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
