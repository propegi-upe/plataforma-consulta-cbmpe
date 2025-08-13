import { Module } from '@nestjs/common';

import { InfraestructureModule } from 'src/infraestructure/infraestructure.module';

import { RequestController } from './request.controller';

import { FetchRequestsUseCase } from './use-cases/fetch-requests.use-case';
import { GetRequestUseCase } from './use-cases/get-request.use-case';

@Module({
  imports: [InfraestructureModule],
  controllers: [RequestController],
  providers: [FetchRequestsUseCase, GetRequestUseCase],
})
export class RequestModule {}
