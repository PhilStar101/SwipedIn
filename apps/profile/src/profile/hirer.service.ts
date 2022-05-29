import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateHirerDto,
  GetPaginationParamsDto,
  Hirer,
  HirerModel,
  Role,
  UpdateHirerDto,
} from '@swiped-in/shared';

@Injectable()
export class HirerService {
  constructor(@InjectModel(Hirer.name) private hirerModel: HirerModel) {}

  async create(createHirerDto: CreateHirerDto) {
    return new this.hirerModel(createHirerDto).save();
  }

  async findAll(paginationParams: GetPaginationParamsDto) {
    return this.hirerModel
      .find({ type: Role.Hirer })
      .select('-auth')
      .skip(paginationParams.offset)
      .limit(paginationParams.limit);
  }

  async findOne(id: string) {
    return this.hirerModel.findOne({ id, type: Role.Hirer }).select('-auth');
  }

  async update(id: string, updateHirerDto: UpdateHirerDto) {
    return this.hirerModel.updateOne({ id, type: Role.Hirer }, updateHirerDto);
  }

  async remove(id: string) {
    return this.hirerModel.deleteOne({ id, type: Role.Hirer });
  }
}
