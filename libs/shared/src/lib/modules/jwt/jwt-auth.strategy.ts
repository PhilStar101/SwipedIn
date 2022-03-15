import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '@swiped-in/types';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { ProfilesService } from './../../profiles/profiles.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    // private readonly profilesService: ProfilesService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['jwt'];
        }
        return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwt.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    // const profile = await this.profilesService.findOne(payload.sub);
    const user = { id: payload.sub };
    if (!user) return null;
    return user;
  }
}
