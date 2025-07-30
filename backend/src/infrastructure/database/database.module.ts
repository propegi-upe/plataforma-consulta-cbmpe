import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormProjectEntity } from './typeorm/entities/typeorm-project.entity';
// import { TypeormUserEntity } from './typeorm/entities/typeorm-user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const testEnv = configService.get('NODE_ENV') === 'test';
        return {
          type: 'postgres',
          host: configService.get(testEnv ? 'DB_HOST_TEST' : 'DB_HOST'),
          port: configService.get(testEnv ? 'DB_PORT_TEST' : 'DB_PORT'),
          username: configService.get(
            testEnv ? 'DB_USERNAME_TEST' : 'DB_USERNAME',
          ),
          password: configService.get(
            testEnv ? 'DB_PASSWORD_TEST' : 'DB_PASSWORD',
          ),
          database: configService.get(testEnv ? 'DB_NAME_TEST' : 'DB_NAME'),
          entities: [TypeormProjectEntity],
          synchronize: false,
          logging: configService.get('NODE_ENV') === 'development',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
