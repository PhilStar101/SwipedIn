import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [
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
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
