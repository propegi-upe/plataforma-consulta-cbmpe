import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormProjectEntity } from './typeorm/entities/typeorm-project.entity';
import { TypeormRequirementEntity } from './typeorm/entities/typeorm-requirement.entity';
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
          entities: [TypeormProjectEntity, TypeormRequirementEntity],
          synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
          logging: configService.get('TYPEORM_LOGGING') === 'true',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
