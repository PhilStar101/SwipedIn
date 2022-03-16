import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateProfileDto,
  GetPaginationParamsDto,
  Profile,
  ProfileModel,
  UpdateProfileDto,
} from '@swiped-in/shared';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile.name) private profileModel: ProfileModel) {}

  async create(createProfileDto: CreateProfileDto) {
    return new this.profileModel(createProfileDto).save();
  }

  async findAll(paginationParams: GetPaginationParamsDto) {
    return this.profileModel
      .find()
      .skip(paginationParams.offset)
      .limit(paginationParams.limit);
  }

  async findOne(id: string) {
    return this.profileModel.findById(id);
  }

  async findByProvider(provider: string, id: string) {
    return this.profileModel.findByProviderId(provider, id);
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    if (updateProfileDto.confirmed && !updateProfileDto.username) {
      throw new RpcException(['username is required when confirmed is true']);
    }

    if (updateProfileDto.username) {
      const profileWithSameUsername = await this.profileModel.findOne({
        username: updateProfileDto.username,
      });
      if (profileWithSameUsername) {
        if (profileWithSameUsername.id === id) return profileWithSameUsername;

        throw new RpcException(['Profile with this username already exists']);
      }
    }
    return this.profileModel.findByIdAndUpdate(id, updateProfileDto);
  }

  async remove(id: string) {
    return this.profileModel.findByIdAndDelete(id);
  }
}
