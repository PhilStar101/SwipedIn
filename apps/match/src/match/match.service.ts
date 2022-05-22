import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMatchDto, Match, MatchModel, Role } from '@swiped-in/shared';

@Injectable()
export class MatchService {
  constructor(@InjectModel(Match.name) private matchModel: MatchModel) {}

  async create(createMatchDto: CreateMatchDto, role: Role) {
    return await new this.matchModel({
      fromRole: role,
      data: createMatchDto,
    }).save();
  }

  async get(id: string, role: Role, onlyIds: boolean) {
    if (role === Role.Employee) {
      const allHirerMatches = await this.matchModel.find({
        fromRole: Role.Hirer,
        'data.employee': id,
      });
      const hirers = allHirerMatches.map((match) => match.data.hirer);

      const matches = this.matchModel.find({
        fromRole: Role.Employee,
        'data.hirer': { $in: hirers },
        'data.employee': id,
      });
      if (onlyIds) {
        return matches;
      }
      return matches.populate('data.hirer');
    } else {
      const allEmployeeMatches = await this.matchModel.find({
        fromRole: Role.Employee,
        'data.hirer': id,
      });

      const employees = allEmployeeMatches.map((match) => match.data.employee);

      const matches = this.matchModel.find({
        fromRole: Role.Hirer,
        'data.hirer': id,
        'data.employee': { $in: employees },
      });

      if (onlyIds) {
        return matches;
      }
      return matches.populate('data.employee');
    }
  }
}
