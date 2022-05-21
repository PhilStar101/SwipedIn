import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateEmployeeDto,
  GetPaginationParamsDto,
  UpdateEmployeeDto,
} from '@swiped-in/shared';

// import { Profile } from 'passport';
import { EmployeeService } from './employee.service';

@Controller('profiles/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query() paginationParams: GetPaginationParamsDto) {
    return this.employeeService.findAll(paginationParams);
  }

  @Get('/byProvider')
  findByProvider(@Query('provider') provider: string, @Query('id') id: string) {
    return this.employeeService.findByProvider(provider, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
