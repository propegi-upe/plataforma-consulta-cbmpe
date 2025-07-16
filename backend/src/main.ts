import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { swaggerConfig } from './core/config/swagger.config';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { ApiKeyGuard } from './core/guards/api-key.guard';
import { ResponseInterceptor } from './core/response/response.interceptor';
import { setCustomValidationPipe } from './core/validation/validation.message';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('api');
  setCustomValidationPipe(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalGuards(new ApiKeyGuard());
  swaggerConfig(app);
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
