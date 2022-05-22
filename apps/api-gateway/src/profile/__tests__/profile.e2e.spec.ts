import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DatabaseModule, DatabaseService } from '@swiped-in/backend/database';
import {
  CreateEmployeeDto,
  CreateHirerDto,
  UpdateEmployeeDto,
  UpdateHirerDto,
} from '@swiped-in/shared';
import { Connection } from 'mongoose';
import * as request from 'supertest';

import { Employee, Hirer } from '../../__mocks__/profiles.mock';
import { AppModule } from '../../app.module';

describe('Profile', () => {
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

  beforeEach(async () => {
    await dbConnection.dropDatabase();
  });

  describe('getProfiles', () => {
    describe('getHirers', () => {
      it('should return an array of Hirers', async () => {
        await dbConnection.collection('profiles').insertMany([Employee, Hirer]);
        const response = await request(httpServer).get('/api/profiles/hirer');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject([Hirer]);
      });

      it('should return one Hirer', async () => {
        const { insertedId } = await dbConnection
          .collection('profiles')
          .insertOne(Hirer);

        const response = await request(httpServer).get(
          `/api/profiles/hirer/${insertedId}`,
        );

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(Hirer);
      });
    });

    describe('getEmployees', () => {
      it('should return an array of Employees', async () => {
        await dbConnection.collection('profiles').insertMany([Employee, Hirer]);
        const response = await request(httpServer).get(
          '/api/profiles/employee',
        );

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
  });

  describe('createProfile', () => {
    describe('createHirers', () => {
      it('should create an Hirer', async () => {
        const createHirerRequest: CreateHirerDto = Hirer;
        const response = await request(httpServer)
          .post('/api/profiles/hirer')
          .send(createHirerRequest);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(createHirerRequest);

        const hirer = await dbConnection
          .collection('profiles')
          .findOne({ email: createHirerRequest.email });
        expect(hirer).toMatchObject(createHirerRequest);
      });
    });

    describe('createEmployees', () => {
      it('should create an Employee', async () => {
        const createEmployeeRequest: CreateEmployeeDto = Employee;
        const response = await request(httpServer)
          .post('/api/profiles/employee')
          .send(createEmployeeRequest);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(createEmployeeRequest);

        const employee = await dbConnection
          .collection('profiles')
          .findOne({ email: createEmployeeRequest.email });
        expect(employee).toMatchObject(createEmployeeRequest);
      });
    });
  });

  describe('updateProfile', () => {
    describe('updateHirer', () => {
      it('should update an Hirer', async () => {
        const { insertedId } = await dbConnection
          .collection('profiles')
          .insertOne(Hirer);

        const updateHirerRequest: UpdateHirerDto = {
          email: 'new@email.com',
        };

        const response = await request(httpServer)
          .patch(`/api/profiles/hirer/${insertedId}`)
          .send(updateHirerRequest);

        expect(response.status).toBe(200);

        const hirer = await dbConnection
          .collection('profiles')
          .findOne({ email: updateHirerRequest.email });
        expect(hirer).toMatchObject(updateHirerRequest);
      });
    });

    describe('updateEmployee', () => {
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

  describe('deleteProfiles', () => {
    describe('deleteHirers', () => {
      it('should delete one Hirer', async () => {
        const { insertedId } = await dbConnection
          .collection('profiles')
          .insertOne(Hirer);

        const response = await request(httpServer).delete(
          `/api/profiles/hirer/${insertedId}`,
        );

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ deletedCount: 1 });
        const hirer = await dbConnection
          .collection('profiles')
          .findOne({ id: insertedId });
        expect(hirer).toBeNull();
      });
    });
    describe('deleteEmployees', () => {
      it('should delete one Employee', async () => {
        const { insertedId } = await dbConnection
          .collection('profiles')
          .insertOne(Employee);

        const response = await request(httpServer).delete(
          `/api/profiles/employee/${insertedId}`,
        );

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ deletedCount: 1 });
        const employee = await dbConnection
          .collection('profiles')
          .findOne({ id: insertedId });
        expect(employee).toBeNull();
      });
    });
  });
});
