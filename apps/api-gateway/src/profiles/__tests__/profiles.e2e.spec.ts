import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule, DatabaseService } from '@swiped-in/backend/database';
import { CreateEmployeeDto, UpdateEmployeeDto } from '@swiped-in/shared';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { AppModule } from '../../app.module';
import { Employee, Hirer } from './__mocks__/profiles.mock';
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
    it('should return an array of Employee', async () => {
      await dbConnection.collection('profiles').insertMany([Employee, Hirer]);
      const response = await request(httpServer).get('/api/profiles/employee');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([Employee]);
    });

    it('should return one Employee', async () => {
      const { insertedId } = await dbConnection
        .collection('profiles')
        .insertOne(Employee);

      const response = await request(httpServer).get(
        `/api/profiles/employee/${insertedId}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(Employee);
    });
  });

  describe('createProfile', () => {
    it('should create an Employee', async () => {
      const createEmployeeRequest: CreateEmployeeDto = {
        ...Employee,
      };
      const response = await request(httpServer)
        .post('/api/profiles/employee')
        .send(createEmployeeRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createEmployeeRequest);

      const user = await dbConnection
        .collection('profiles')
        .findOne({ email: createEmployeeRequest.email });
      expect(user).toMatchObject(createEmployeeRequest);
    });
  });

  describe('updateProfile', () => {
    it('should update an Employee', async () => {
      const { insertedId } = await dbConnection
        .collection('profiles')
        .insertOne(Employee);

      const updateEmployeeRequest: UpdateEmployeeDto = {
        email: 'new@email.com',
      };

      const response = await request(httpServer)
        .patch(`/api/profiles/employee/${insertedId}`)
        .send(updateEmployeeRequest);

      expect(response.status).toBe(200);

      const employee = await dbConnection
        .collection('profiles')
        .findOne({ email: updateEmployeeRequest.email });
      expect(employee).toMatchObject(updateEmployeeRequest);
    });
  });
});
