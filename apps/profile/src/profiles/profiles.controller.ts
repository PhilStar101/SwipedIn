import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  createPatternFactory,
  CreateProfileDto,
  GetPaginationParamsDto,
  UpdateProfileDto,
} from '@swiped-in/shared';

import { ProfilesService } from './profiles.service';

const profilesPattern = createPatternFactory('profiles');

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @MessagePattern(profilesPattern('create'))
  create(@Payload() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @MessagePattern(profilesPattern('findAll'))
  findAll(@Payload() paginationParams: GetPaginationParamsDto) {
    return this.profilesService.findAll(paginationParams);
  }

  @MessagePattern(profilesPattern('findByProvider'))
  findByProvider(
    @Payload('provider') provider: string,
    @Payload('id') id: string,
  ) {
    return this.profilesService.findByProvider(provider, id);
  }

  // @MessagePattern(profilesPattern('findByJwt'))
  // findByJwt(@Req() req: { user: Profile }) {
  //   return req.user;
  // }

  @MessagePattern(profilesPattern('findOne'))
  findOne(@Payload('id') id: string) {
    return this.profilesService.findOne(id);
  }

  @MessagePattern(profilesPattern('update'))
  update(
    @Payload('id') id: string,
    @Payload() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @MessagePattern(profilesPattern('remove'))
  remove(@Payload('id') id: string) {
    return this.profilesService.remove(id);
  }
}
