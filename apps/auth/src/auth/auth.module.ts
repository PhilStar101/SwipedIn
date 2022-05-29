import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@swiped-in/backend/database';
import {
  Employee,
  EmployeeSchema,
  Hirer,
  HirerSchema,
} from '@swiped-in/shared';

// import {
//   AtStrategy,
//   RtStrategy,
// } from '../../../api-gateway/src/common/strategies';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema, collection: 'profiles' },
      { name: Hirer.name, schema: HirerSchema, collection: 'profiles' },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
