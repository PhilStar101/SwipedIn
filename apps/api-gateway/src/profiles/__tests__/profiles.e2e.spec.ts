import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule, DatabaseService } from '@swiped-in/backend/database';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { AppModule } from '../../app.module';
import { Employee, Hirer } from './__mocks__/profile.mock';
// import { CreateUserRequest } from '../../dto/request/create-user-request.dto';

describe('ProfilesController', () => {
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
    await dbConnection.collection('profiles').deleteMany({});
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('profiles').deleteMany({});
  });

  describe('getProfiles', () => {
    it('should return an array of profiles', async () => {
      await dbConnection.collection('profiles').insertMany([Employee, Hirer]);
      const response = await request(httpServer).get('/api/profiles');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([Employee, Hirer]);
    });
  });

  describe('createProfile', () => {
    it('should create a Profile', async () => {
      const createEmployeeRequest = {
        name: Employee.name,
        email: Employee.email,
        age: Employee.age,
      };
      const response = await request(httpServer)
        .post('api/profiles')
        .send(createEmployeeRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createEmployeeRequest);

      const user = await dbConnection
        .collection('users')
        .findOne({ email: createEmployeeRequest.email });
      expect(user).toMatchObject(createEmployeeRequest);
    });
  });
});
