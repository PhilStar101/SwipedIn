import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateHirerDto,
  createPatternFactory,
  GetPaginationParamsDto,
  UpdateHirerDto,
} from '@swiped-in/shared';

const hirersPattern = createPatternFactory('profiles/hirer');

@Injectable()
export class HirerService {
  constructor(@Inject('PROFILE_SERVICE') private hirerClient: ClientProxy) {}

  async create(createHirerDto: CreateHirerDto) {
    return this.hirerClient.send(hirersPattern('create'), createHirerDto);
  }

  async findAll(paginationParams: GetPaginationParamsDto) {
    return this.hirerClient.send(hirersPattern('findAll'), paginationParams);
  }

  async findOne(id: string) {
    return this.hirerClient.send(hirersPattern('findOne'), { id });
  }

  async findByProvider(provider: string, id: string) {
    return this.hirerClient.send(hirersPattern('findByProvider'), {
      provider,
      id,
    });
  }

  async update(id: string, updateHirerDto: UpdateHirerDto) {
    return this.hirerClient.send(hirersPattern('update'), {
      id,
      updateHirerDto,
    });
  }

  async remove(id: string) {
    return this.hirerClient.send(hirersPattern('remove'), {
      id,
    });
  }
}
