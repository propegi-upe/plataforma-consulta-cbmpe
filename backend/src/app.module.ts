import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infraestructure/database/database.module';
import { EnterpriseModule } from './application/enteprise/enterprise.module';
import { RequestModule } from './application/request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    EnterpriseModule,
    RequestModule,
  ],
})
export class AppModule {}
