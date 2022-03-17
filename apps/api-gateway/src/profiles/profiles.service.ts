import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  createPatternFactory,
  CreateProfileDto,
  GetPaginationParamsDto,
  UpdateProfileDto,
} from '@swiped-in/shared';

const profilesPattern = createPatternFactory('profiles');

@Injectable()
export class ProfilesService {
  constructor(@Inject('PROFILE_SERVICE') private profileClient: ClientProxy) {}

  async create(createProfileDto: CreateProfileDto) {
    return this.profileClient.send(profilesPattern('create'), createProfileDto);
  }

  async findAll(paginationParams: GetPaginationParamsDto) {
    return this.profileClient.send(
      profilesPattern('findAll'),
      paginationParams,
    );
  }

  async findOne(id: string) {
    return this.profileClient.send(profilesPattern('findOne'), { id });
  }

  async findByProvider(provider: string, id: string) {
    return this.profileClient.send(profilesPattern('findByProvider'), {
      provider,
      id,
    });
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    return this.profileClient.send(profilesPattern('update'), {
      id,
      updateProfileDto,
    });
  }

  async remove(id: string) {
    return this.profileClient.send(profilesPattern('remove'), {
      id,
    });
  }
}
