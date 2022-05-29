import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'AT_SECRET',
    });
  }

  // TODO: add shared payload Interface
  validate(payload) {
    console.log('AT payload', JSON.stringify(payload, null, 2));
    return payload;
  }
}
