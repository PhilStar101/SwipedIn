import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(message): { message: string } {
    return { message };
  }
}
