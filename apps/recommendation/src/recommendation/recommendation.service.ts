import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import {
  createPatternFactory,
  Employee,
  EmployeeModel,
  GetPaginationParamsDto,
  Hirer,
  HirerModel,
  Role,
} from '@swiped-in/shared';
import { firstValueFrom } from 'rxjs';

const matchPattern = createPatternFactory('match');

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel(Hirer.name) private hirerModel: HirerModel,
    @InjectModel(Employee.name) private employeeModel: EmployeeModel,
    @Inject('MATCH_SERVICE') private matchClient: ClientProxy,
  ) {}

  async get(id: string, paginationParams: GetPaginationParamsDto, role: Role) {
    if (role === Role.Hirer) {
      const matches: string[] = (
        await firstValueFrom(
          this.matchClient.send(matchPattern(`get_${Role[role]}_ids`), {
            id,
            role,
          }),
        )
      ).map((match) => match.data.employee);

      const profile = await this.hirerModel.findOne({ id, type: Role.Hirer });

      const desiredStack = profile.stack;

      const rawRecommendations = await this.employeeModel.find({
        type: Role.Employee,
        'experience.stack': {
          $in: desiredStack,
        },
      });

      const recommendations = rawRecommendations.filter(
        (recommendation) => matches.indexOf(recommendation.id) < 0,
      );

      return recommendations.slice(
        paginationParams.offset || 0,
        paginationParams.limit || recommendations.length,
      );
    } else {
      const matches: string[] = (
        await firstValueFrom(
          this.matchClient.send(matchPattern(`get_${Role[role]}_ids`), {
            id,
            role,
          }),
        )
      ).map((match) => match.data.hirer);

      const profile = await this.employeeModel.findOne({
        id,
        type: Role.Employee,
      });

      const desiredStack = profile.experience.stack;

      const rawRecommendations = await this.hirerModel.find({
        type: Role.Hirer,
        stack: {
          $in: desiredStack,
        },
      });

      const recommendations = rawRecommendations.filter(
        (recommendation) => matches.indexOf(recommendation.id) < 0,
      );

      return recommendations.slice(
        paginationParams.offset || 0,
        paginationParams.limit || recommendations.length,
      );
    }
  }
}
