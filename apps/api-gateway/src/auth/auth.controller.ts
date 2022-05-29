import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public, ReqUser } from '@swiped-in/backend/decorators';
import { AuthDto, Role } from '@swiped-in/shared';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: Illuminate hirer, employee from route paths by introduce :role param
  @Public()
  @Post('hirer/signup')
  @HttpCode(HttpStatus.CREATED)
  signupHirer(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto, Role.Hirer);
  }

  @Public()
  @Post('employee/signup')
  @HttpCode(HttpStatus.CREATED)
  signupEmployee(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto, Role.Employee);
  }

  @Public()
  @Post('hirer/signin')
  @HttpCode(HttpStatus.OK)
  signinHirer(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto, Role.Hirer);
  }

  @Public()
  @Post('hirer/signin')
  @HttpCode(HttpStatus.OK)
  signinEmployee(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto, Role.Employee);
  }

  @Post('hirer/signout')
  @HttpCode(HttpStatus.OK)
  signoutHirer(@ReqUser('id') userId: number) {
    return this.authService.signout(userId, Role.Hirer);
  }

  @Post('employee/signout')
  @HttpCode(HttpStatus.OK)
  signoutEmployee(@ReqUser('id') userId: number) {
    return this.authService.signout(userId, Role.Employee);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('hirer/refresh')
  @HttpCode(HttpStatus.OK)
  refreshHirer(
    @ReqUser('id') userId: number,
    @ReqUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refresh(userId, refreshToken, Role.Hirer);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('employee/refresh')
  @HttpCode(HttpStatus.OK)
  refreshEmployee(
    @ReqUser('id') userId: number,
    @ReqUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refresh(userId, refreshToken, Role.Employee);
  }

  @Public()
  @Post('drop')
  dropProfiles() {
    return this.authService.dropProfiles();
  }
}
