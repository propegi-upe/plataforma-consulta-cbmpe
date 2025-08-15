import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormEnterpriseEntity } from './typeorm/entities/typeorm-enterprise.entity';
import { TypeormRequestEntity } from './typeorm/entities/typeorm-request.entity';
import { TypeormAvcbDocumentView } from './typeorm/entities/typeorm-avcbDocument.entity';
import { TypeormRequestSituationEntity } from './typeorm/entities/typeorm-situation-request.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [
            TypeormEnterpriseEntity,
            TypeormRequestEntity,
            TypeormAvcbDocumentView,
            TypeormRequestSituationEntity,
          ],
          synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
          logging: configService.get('TYPEORM_LOGGING') === 'true',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
