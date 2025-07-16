import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createTableData, dropTableData } from './typeorm-db.test';
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter';
import { ResponseInterceptor } from 'src/core/response/response.interceptor';
import { ApiKeyGuard } from 'src/core/guards/api-key.guard';
import { setCustomValidationPipe } from 'src/core/validation/validation.message';
import { RESPONSE } from 'src/core/response/response.messages';
import { uuidv7 } from 'uuidv7';

const API_KEY = process.env.API_KEY as string;

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const data: any = {
    mockBody: {
      name: 'Fulano de Tal',
      email: 'fulano@email.com',
      password: 'SenhaForte123',
      isActive: true,
    },
    userCreated: null,
  };

  beforeAll(async () => {
    await dropTableData(['users']);
    await createTableData(['users']);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    setCustomValidationPipe(app);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalGuards(new ApiKeyGuard());
    await app.init();
  });

  describe('/api/users (POST)', () => {
    it('should create a new user', async () => {
      return request(app.getHttpServer())
        .post('/api/users')
        .set('Api-Key', API_KEY)
        .send(data.mockBody)
        .expect(201)
        .expect((res) => {
          expect(res.body.data).toHaveProperty('user');
          const user = res.body.data.user;
          const expectedFields = ['id', 'name', 'email', 'isActive'];
          expectedFields.forEach((field) => {
            expect(user).toHaveProperty(field);
          });
          data.userCreated = user;
        });
    });

    it('should return 400 if required field is missing', async () => {
      const requiredFields = ['name', 'email', 'password', 'isActive'];
      for (const field of requiredFields) {
        const body = { ...data.mockBody };
        delete body[field];
        await request(app.getHttpServer())
          .post('/api/users')
          .set('Api-Key', API_KEY)
          .send(body)
          .expect(400)
          .expect((res) => {
            expect(res.body.message).toBeDefined();
          });
      }
    });
  });

  describe('/api/users (GET)', () => {
    it('should return all users', async () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .set('Api-Key', API_KEY)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body.data.users)).toBe(true);
          res.body.data.users.forEach((user: any) => {
            const expectedFields = ['id', 'name', 'email', 'isActive'];
            expectedFields.forEach((field) => {
              expect(user).toHaveProperty(field);
            });
          });
        });
    });
  });

  describe('/api/users/:id (GET)', () => {
    it('should return a specific user by id', async () => {
      const id = data.userCreated.id;
      return request(app.getHttpServer())
        .get(`/api/users/${id}`)
        .set('Api-Key', API_KEY)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.user.id).toBe(id);
          const expectedFields = ['id', 'name', 'email', 'isActive'];
          expectedFields.forEach((field) => {
            expect(res.body.data.user).toHaveProperty(field);
          });
        });
    });

    it('should return 404 if user not found', async () => {
      return request(app.getHttpServer())
        .get(`/api/users/${uuidv7()}`)
        .set('Api-Key', API_KEY)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe(RESPONSE.USERS.NOT_FOUND);
        });
    });
  });

  describe('/api/users/:id (PUT)', () => {
    it('should update a user', async () => {
      const dataToUpdate = {
        ...data.mockBody,
        name: 'Atualizado',
      };
      delete dataToUpdate.password;
      const id = data.userCreated.id;
      return request(app.getHttpServer())
        .put(`/api/users/${id}`)
        .set('Api-Key', API_KEY)
        .send(dataToUpdate)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.user.name).toBe('Atualizado');
        });
    });

    it('should return 404 if user not found', async () => {
      return request(app.getHttpServer())
        .put(`/api/users/${uuidv7()}`)
        .set('Api-Key', API_KEY)
        .send(data.mockBody)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe(RESPONSE.USERS.NOT_FOUND);
        });
    });
  });
});
