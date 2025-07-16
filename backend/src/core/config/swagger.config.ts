import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

const SWAGGER_BASIC_AUTH_USER = process.env.SWAGGER_BASIC_AUTH_USER as string;
const SWAGGER_BASIC_AUTH_PASSWORD = process.env
  .SWAGGER_BASIC_AUTH_PASSWORD as string;

export function swaggerConfig(app: INestApplication) {
  app.use(
    '/docs',
    basicAuth({
      challenge: true,
      users: {
        [SWAGGER_BASIC_AUTH_USER]: SWAGGER_BASIC_AUTH_PASSWORD,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API CBMPE')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'api-key',
        in: 'header',
      },
      'Api-Key',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'TEMPLATE API',
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
}
