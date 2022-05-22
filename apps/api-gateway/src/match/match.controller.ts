import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMatchDto, Role } from '@swiped-in/shared';

import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('hirer')
  createHirerMatch(@Body() createHirerDto: CreateMatchDto) {
    return this.matchService.create(createHirerDto, Role.Hirer);
  }

  @Post('employee')
  createEmployeeMatch(@Body() createHirerDto: CreateMatchDto) {
    return this.matchService.create(createHirerDto, Role.Employee);
  }

  @Get('hirer/:id')
  getHirerMatches(@Param('id') id: string) {
    return this.matchService.get(id, Role.Hirer);
  }

  @Get('employee/:id')
  getEmployeeMatches(@Param('id') id: string) {
    return this.matchService.get(id, Role.Employee);
  }
}
