import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter';
import { ResponseInterceptor } from 'src/core/response/response.interceptor';
import { ApiKeyGuard } from 'src/core/guards/api-key.guard';
import { setCustomValidationPipe } from 'src/core/validation/validation.message';

const API_KEY = process.env.API_KEY as string;

describe('ProjectController (e2e)', () => {
  let app: INestApplication;

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

  describe('/api/projects (GET)', () => {
    it('should return all projects', async () => {
      return request(app.getHttpServer())
        .get('/api/projects')
        .set('Api-Key', API_KEY)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body.data.projects)).toBe(true);
          res.body.data.projects.forEach((project: any) => {
            const expectedFields = ['id'];
            expectedFields.forEach((field) => {
              expect(project).toHaveProperty(field);
            });
          });
        });
    });
  });
  describe('/api/projects/:id (GET)', () => {
    it('should return a project by ID', async () => {
      const projectId = 1;
      return request(app.getHttpServer())
        .get(`/api/projects/${projectId}`)
        .set('Api-Key', API_KEY)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.project).toHaveProperty('id', projectId);
        });
    });

    it('should return 404 if project not found', async () => {
      return request(app.getHttpServer())
        .get('/api/projects/9999')
        .set('Api-Key', API_KEY)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toBe('Projeto não encontrado');
        });
    });
  });
});
