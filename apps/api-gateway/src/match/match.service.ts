import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMatchDto, createPatternFactory, Role } from '@swiped-in/shared';

const matchPattern = createPatternFactory('match');

@Injectable()
export class MatchService {
  constructor(@Inject('MATCH_SERVICE') private matchClient: ClientProxy) {}

  async create(createMatchDto: CreateMatchDto, role: Role) {
    return this.matchClient.send(
      matchPattern(`create_${Role[role]}`),
      createMatchDto,
    );
  }

  async get(id: string, role: Role) {
    return this.matchClient.send(matchPattern(`get_${Role[role]}`), {
      id,
      role,
    });
  }
}
