import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDto, createPatternFactory, Role } from '@swiped-in/shared';

const authPattern = createPatternFactory('auth');

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  async signup(authDto: AuthDto, role: Role) {
    return this.authClient.send(authPattern('signup'), {
      authDto,
      role,
    });
  }

  async signin(authDto: AuthDto, role: Role) {
    return this.authClient.send(authPattern('signin'), {
      authDto,
      role,
    });
  }

  async signout(userId: number, role: Role) {
    return this.authClient.send(authPattern('signout'), {
      userId,
      role,
    });
  }

  async refresh(userId: number, refreshToken: string, role: Role) {
    return this.authClient.send(authPattern('refresh'), {
      userId,
      refreshToken,
      role,
    });
  }

  async dropProfiles() {
    return this.authClient.send(authPattern('drop'), {});
  }
}
