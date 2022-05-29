import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DatabaseService } from '@swiped-in/backend/database';
import { AuthDto, createPatternFactory, Role } from '@swiped-in/shared';

import { AuthService } from './auth.service';
import { Tokens } from './types';

const authPattern = createPatternFactory('auth');

@Controller()
export class AuthController {
  constructor(private authService: AuthService, private db: DatabaseService) {}

  @MessagePattern(authPattern('signup'))
  signup(@Payload('authDto') authDto: AuthDto, @Payload('role') role: Role) {
    return this.authService.signup(authDto, role);
  }

  @MessagePattern(authPattern('signin'))
  signin(@Payload('authDto') authDto: AuthDto, @Payload('role') role: Role) {
    return this.authService.signin(authDto, role);
  }

  @MessagePattern(authPattern('signout'))
  signout(@Payload('userId') userId: number, @Payload('role') role: Role) {
    return this.authService.signout(userId, role);
  }

  @MessagePattern(authPattern('refresh'))
  refreshTokens(
    @Payload('userId') userId: number,
    @Payload('refreshToken') refreshToken: string,
    @Payload('role') role: Role,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken, role);
  }

  @MessagePattern(authPattern('drop'))
  dropProfiles() {
    return this.db.connection.collection('profiles').drop();
  }
}
