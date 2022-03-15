import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@swiped-in/types';

import { Profile } from '../../schemas/mongodb/profile.schema';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  authorize(user: Profile) {
    const payload: JwtPayload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
