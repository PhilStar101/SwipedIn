import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Employee,
  EmployeeSchema,
  Hirer,
  HirerSchema,
  Match,
  MatchSchema,
} from '@swiped-in/shared';

import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema, collection: 'profiles' },
      { name: Hirer.name, schema: HirerSchema, collection: 'profiles' },
      { name: Match.name, schema: MatchSchema, collection: 'matches' },
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
