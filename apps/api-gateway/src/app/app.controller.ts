import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  getData() {
    return this.client.send('get-data', { message: 'hello auth service' });
  }
}
