import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMatchDto, createPatternFactory, Role } from '@swiped-in/shared';

import { MatchService } from './match.service';

const matchPattern = createPatternFactory('match');

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @MessagePattern(matchPattern(`create_${Role[Role.Hirer]}`))
  createHirerMatch(@Payload() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto, Role.Hirer);
  }

  @MessagePattern(matchPattern(`create_${Role[Role.Employee]}`))
  createEmployeeMatch(@Payload() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto, Role.Employee);
  }

  @MessagePattern(matchPattern(`get_${Role[Role.Hirer]}`))
  getHirerMatches(@Payload('id') id: string) {
    return this.matchService.get(id, Role.Hirer, false);
  }

  @MessagePattern(matchPattern(`get_${Role[Role.Employee]}`))
  getEmployeeMatches(@Payload('id') id: string) {
    return this.matchService.get(id, Role.Employee, false);
  }

  @MessagePattern(matchPattern(`get_${Role[Role.Hirer]}_ids`))
  getHirerMatchesIds(@Payload('id') id: string) {
    return this.matchService.get(id, Role.Hirer, true);
  }

  @MessagePattern(matchPattern(`get_${Role[Role.Employee]}_ids`))
  getEmployeeMatchesIds(@Payload('id') id: string) {
    return this.matchService.get(id, Role.Employee, true);
  }
}
