import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get-data')
  getData(body: { message: string }) {
    return this.appService.getData(body.message);
  }
}
