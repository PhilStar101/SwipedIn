import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateEmployeeDto,
  createPatternFactory,
  GetPaginationParamsDto,
  UpdateEmployeeDto,
} from '@swiped-in/shared';

const employeePattern = createPatternFactory('profiles/employee');

@Injectable()
export class EmployeeService {
  constructor(@Inject('PROFILE_SERVICE') private employeeClient: ClientProxy) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeClient.send(
      employeePattern('create'),
      createEmployeeDto,
    );
  }

  async findAll(paginationParams: GetPaginationParamsDto) {
    return this.employeeClient.send(
      employeePattern('findAll'),
      paginationParams,
    );
  }

  async findOne(id: string) {
    return this.employeeClient.send(employeePattern('findOne'), { id });
  }

  async findByProvider(provider: string, id: string) {
    return this.employeeClient.send(employeePattern('findByProvider'), {
      provider,
      id,
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeClient.send(employeePattern('update'), {
      id,
      updateEmployeeDto,
    });
  }

  async remove(id: string) {
    return this.employeeClient.send(employeePattern('remove'), {
      id,
    });
  }
}
