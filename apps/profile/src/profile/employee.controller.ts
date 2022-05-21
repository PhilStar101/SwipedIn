import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEmployeeDto,
  createPatternFactory,
  GetPaginationParamsDto,
  UpdateEmployeeDto,
} from '@swiped-in/shared';

import { EmployeeService } from './employee.service';

const employeePattern = createPatternFactory('profiles/employee');

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @MessagePattern(employeePattern('create'))
  create(@Payload() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @MessagePattern(employeePattern('findAll'))
  findAll(@Payload() paginationParams: GetPaginationParamsDto) {
    return this.employeeService.findAll(paginationParams);
  }

  // @MessagePattern(employeePattern('findByProvider'))
  // findByProvider(
  //   @Payload('provider') provider: string,
  //   @Payload('id') id: string,
  // ) {
  //   return this.employeeService.findByProvider(provider, id);
  // }

  // @MessagePattern(employeePattern('findByJwt'))
  // findByJwt(@Req() req: { user: Employee }) {
  //   return req.user;
  // }

  @MessagePattern(employeePattern('findOne'))
  findOne(@Payload('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @MessagePattern(employeePattern('update'))
  update(
    @Payload('id') id: string,
    @Payload('updateEmployeeDto') updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @MessagePattern(employeePattern('remove'))
  remove(@Payload('id') id: string) {
    return this.employeeService.remove(id);
  }
}
