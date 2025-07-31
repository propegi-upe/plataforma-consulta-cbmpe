import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ProjectModule } from './infrastructure/http/controllers/project.module';
import { InspectionRequestModule } from './infrastructure/http/controllers/inspection-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ProjectModule,
    InspectionRequestModule,
  ],
})
export class AppModule {}
