import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateEmployeeDto,
  Employee,
  EmployeeModel,
  GetPaginationParamsDto,
  Role,
  UpdateEmployeeDto,
} from '@swiped-in/shared';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: EmployeeModel,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return new this.employeeModel(createEmployeeDto).save();
  }

  async findAll(paginationParams: GetPaginationParamsDto) {
    return this.employeeModel
      .find({ type: Role.Employee })
      .skip(paginationParams.offset)
      .limit(paginationParams.limit);
  }

  async findOne(id: string) {
    return this.employeeModel.findOne({ id, type: Role.Employee });
  }

  // async findByProvider(provider: string, id: string) {
  //   return this.employeeModel.findByProviderId(provider, id);
  // }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeModel.updateOne(
      { id, type: Role.Employee },
      updateEmployeeDto,
    );
  }

  async remove(id: string) {
    return this.employeeModel.deleteOne({ id, type: Role.Employee });
  }
}
