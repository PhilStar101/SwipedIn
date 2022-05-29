import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  AuthDto,
  Employee,
  EmployeeModel,
  Hirer,
  HirerModel,
  Role,
} from '@swiped-in/shared';
import * as argon from 'argon2';

import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: EmployeeModel,
    @InjectModel(Hirer.name) private hirerModel: HirerModel,
    private jwtService: JwtService,
  ) {}

  async signup(authDto: AuthDto, role: Role) {
    const hash = await argon.hash(authDto.password);
    let profile: Hirer | Employee;

    if (role === Role.Hirer) {
      profile = await new this.hirerModel({
        email: authDto.email,
        auth: { password: hash },
      }).save();
    } else {
      profile = await new this.employeeModel({
        email: authDto.email,
        auth: { password: hash },
      }).save();
    }

    const tokens = await this.getTokens(profile.id, profile.email, role);
    if (role === Role.Hirer) {
      await this.updateRtHash(
        this.hirerModel,
        profile.id,
        tokens.refresh_token,
      );
    } else {
      await this.updateRtHash(
        this.employeeModel,
        profile.id,
        tokens.refresh_token,
      );
    }

    return tokens;
  }

  // TODO: Get model at start of the method and then use it
  async signin(authDto: AuthDto, role: Role) {
    let profile: Hirer | Employee;

    if (role === Role.Hirer) {
      profile = await this.hirerModel.findOne({
        email: authDto.email,
      });
    } else {
      profile = await this.employeeModel.findOne({
        email: authDto.email,
      });
    }
    if (!profile) throw new RpcException('Access Denied');

    const passwordMatches = await argon.verify(
      profile.auth.password,
      authDto.password,
    );
    if (!passwordMatches) throw new RpcException('Access Denied');

    const tokens = await this.getTokens(profile.id, profile.email, role);
    if (role === Role.Hirer) {
      await this.updateRtHash(
        this.hirerModel,
        profile.id,
        tokens.refresh_token,
      );
    } else {
      await this.updateRtHash(
        this.employeeModel,
        profile.id,
        tokens.refresh_token,
      );
    }

    return tokens;
  }

  async signout(userId: number, role: Role) {
    if (role === Role.Hirer) {
      return await this.hirerModel.updateOne(
        {
          id: userId,
          'auth.rt': { $ne: null },
        },
        {
          'auth.rt': null,
        },
      );
    }
    return await this.employeeModel.updateOne(
      {
        id: userId,
        'auth.rt': { $not: null },
      },
      {
        'auth.rt': null,
      },
    );
  }

  async refreshTokens(userId: number, rt: string, role: Role) {
    let profile: Hirer | Employee;

    if (role === Role.Hirer) {
      profile = await this.hirerModel.findOne({
        id: userId,
      });
    } else {
      profile = await this.employeeModel.findOne({
        id: userId,
      });
    }
    if (!profile || !profile.auth.rt) throw new RpcException('Access Denied');

    const rtMatches = await argon.verify(profile.auth.rt, rt);
    // TODO: Improve handling of the exceptions
    console.log(rtMatches);
    if (!rtMatches) throw new RpcException('Access Denied');

    const tokens = await this.getTokens(profile.id, profile.email, role);

    if (role === Role.Hirer) {
      await this.updateRtHash(
        this.hirerModel,
        profile.id,
        tokens.refresh_token,
      );
    } else {
      await this.updateRtHash(
        this.employeeModel,
        profile.id,
        tokens.refresh_token,
      );
    }

    return tokens;
  }

  async updateRtHash(
    model: HirerModel | EmployeeModel,
    userId: number,
    rt: string,
  ) {
    const hash = await argon.hash(rt);
    return model.updateOne(
      { id: userId },
      {
        'auth.rt': hash,
      },
    );
  }

  async getTokens(userId: number, email: string, role: Role): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
      role,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: 'AT_SECRET',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: 'RT_SECRET',
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
