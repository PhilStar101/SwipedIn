import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateHirerDto,
  createPatternFactory,
  GetPaginationParamsDto,
  UpdateHirerDto,
} from '@swiped-in/shared';

import { HirerService } from './hirer.service';

const hirerPattern = createPatternFactory('profiles/hirer');

@Controller()
export class HirerController {
  constructor(private readonly hirerService: HirerService) {}

  @MessagePattern(hirerPattern('create'))
  create(@Payload() createHirerDto: CreateHirerDto) {
    return this.hirerService.create(createHirerDto);
  }

  @MessagePattern(hirerPattern('findAll'))
  findAll(@Payload() paginationParams: GetPaginationParamsDto) {
    return this.hirerService.findAll(paginationParams);
  }

  // @MessagePattern(hirerPattern('findByProvider'))
  // findByProvider(
  //   @Payload('provider') provider: string,
  //   @Payload('id') id: string,
  // ) {
  //   return this.hirerService.findByProvider(provider, id);
  // }

  // @MessagePattern(hirerPattern('findByJwt'))
  // findByJwt(@Req() req: { user: Hirer }) {
  //   return req.user;
  // }

  @MessagePattern(hirerPattern('findOne'))
  findOne(@Payload('id') id: string) {
    return this.hirerService.findOne(id);
  }

  @MessagePattern(hirerPattern('update'))
  update(
    @Payload('id') id: string,
    @Payload('updateHirerDto') updateHirerDto: UpdateHirerDto,
  ) {
    console.log(updateHirerDto);

    return this.hirerService.update(id, updateHirerDto);
  }

  @MessagePattern(hirerPattern('remove'))
  remove(@Payload('id') id: string) {
    return this.hirerService.remove(id);
  }
}
