import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule, DatabaseService } from '@swiped-in/backend/database';
import { CreateMatchDto, Role } from '@swiped-in/shared';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { getEmployee, getHirer } from '../../__mocks__/profiles.mock';
import { AppModule } from '../../app.module';

describe('Recommendation', () => {
  let dbConnection: Connection;
  let httpServer: unknown;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('/api');
    await app.init();

    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).connection;
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await dbConnection.dropDatabase();
    await app.close();
  });

  const createMatchDto = (hirerId, employeeId): CreateMatchDto => ({
    hirer: hirerId,
    employee: employeeId,
  });

  const insertMockProfiles = async () => {
    const inserted: { hirers: string[]; employees: string[] } = {
      hirers: [],
      employees: [],
    };

    const insertedProfiles = await dbConnection
      .collection('profiles')
      .insertMany([
        getHirer(),
        getHirer(),
        getHirer(),
        getEmployee(),
        getEmployee(),
        getEmployee(),
      ]);

    inserted.hirers.push(insertedProfiles.insertedIds[0].toString());
    inserted.hirers.push(insertedProfiles.insertedIds[1].toString());
    inserted.hirers.push(insertedProfiles.insertedIds[2].toString());
    inserted.employees.push(insertedProfiles.insertedIds[3].toString());
    inserted.employees.push(insertedProfiles.insertedIds[4].toString());
    inserted.employees.push(insertedProfiles.insertedIds[5].toString());
    return inserted;
  };

  beforeEach(async () => {
    await dbConnection.dropDatabase();
  });

  describe('getRecommendation', () => {
    const insertMatchFactory = async () => {
      const insertedIds = await insertMockProfiles();
      return async (role: Role, hirer: number, employee: number) => {
        await dbConnection.collection('matches').insertOne({
          fromRole: role,
          data: createMatchDto(
            insertedIds.hirers[hirer],
            insertedIds.employees[employee],
          ),
        });
        return {
          hirerId: insertedIds.hirers[hirer],
          employeeId: insertedIds.employees[employee],
        };
      };
    };

    describe('getHirerRecommendation', () => {
      it('should get 2 recommendation(s) when 1 employe(es) accepts 1 hirer(s) and 1 hirer accepts 1 employee(s)', async () => {
        const insertMatch = await insertMatchFactory();
        await insertMatch(Role.Employee, 0, 0);
        const { hirerId } = await insertMatch(Role.Hirer, 0, 0);

        const response = await request(httpServer).get(
          `/api/recommendation/hirer/${hirerId}`,
        );

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
      });
    });

    describe('getEmployeeRecommendation', () => {
      it('should get 2 recommendation(s) when 1 employe(es) accepts 1 hirer(s) and 1 hirer accepts 1 employee(s)', async () => {
        const insertMatch = await insertMatchFactory();
        const { employeeId } = await insertMatch(Role.Employee, 0, 0);
        await insertMatch(Role.Hirer, 0, 0);

        const response = await request(httpServer).get(
          `/api/recommendation/employee/${employeeId}`,
        );

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
      });
    });
  });
});
