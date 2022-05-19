import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEmployeeDto,
  createPatternFactory,
  GetPaginationParamsDto,
  UpdateEmployeeDto,
} from '@swiped-in/shared';

import { EmployeesService } from './employee.service';

const employeesPattern = createPatternFactory('profiles/employee');

@Controller()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @MessagePattern(employeesPattern('create'))
  create(@Payload() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @MessagePattern(employeesPattern('findAll'))
  findAll(@Payload() paginationParams: GetPaginationParamsDto) {
    return this.employeesService.findAll(paginationParams);
  }

  // @MessagePattern(employeesPattern('findByProvider'))
  // findByProvider(
  //   @Payload('provider') provider: string,
  //   @Payload('id') id: string,
  // ) {
  //   return this.employeesService.findByProvider(provider, id);
  // }

  // @MessagePattern(employeesPattern('findByJwt'))
  // findByJwt(@Req() req: { user: Employee }) {
  //   return req.user;
  // }

  @MessagePattern(employeesPattern('findOne'))
  findOne(@Payload('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @MessagePattern(employeesPattern('update'))
  update(
    @Payload('id') id: string,
    @Payload('updateEmployeeDto') updateEmployeeDto: UpdateEmployeeDto,
  ) {
    console.log(updateEmployeeDto);

    return this.employeesService.update(id, updateEmployeeDto);
  }

  @MessagePattern(employeesPattern('remove'))
  remove(@Payload('id') id: string) {
    return this.employeesService.remove(id);
  }
}
