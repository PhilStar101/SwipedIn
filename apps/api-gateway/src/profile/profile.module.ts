import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { HirerController } from './hirer.controller';
import { HirerService } from './hirer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
  ],
  controllers: [EmployeeController, HirerController],
  providers: [EmployeeService, HirerService],
})
export class ProfileModule {}
