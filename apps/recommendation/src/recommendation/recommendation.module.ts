import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Employee,
  EmployeeSchema,
  Hirer,
  HirerSchema,
} from '@swiped-in/shared';

import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema, collection: 'profiles' },
      { name: Hirer.name, schema: HirerSchema, collection: 'profiles' },
    ]),
    ClientsModule.register([
      {
        name: 'MATCH_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationModule {}
