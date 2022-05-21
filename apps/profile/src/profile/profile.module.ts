import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Employee,
  EmployeeSchema,
  Hirer,
  HirerSchema,
} from '@swiped-in/shared';

import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { HirerController } from './hirer.controller';
import { HirerService } from './hirer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema, collection: 'profiles' },
      { name: Hirer.name, schema: HirerSchema, collection: 'profiles' },
    ]),
  ],
  controllers: [EmployeeController, HirerController],
  providers: [EmployeeService, HirerService],
})
export class ProfileModule {}
