import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infraestructure/database/database.module';
import { ProjectModule } from './application/project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ProjectModule,
  ],
})
export class AppModule {}
