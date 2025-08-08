import { Module } from '@nestjs/common';
import { InfraestructureModule } from 'src/infraestructure/infraestructure.module';
import { RequestController } from './request.controller';
import { FetchRequestsUseCase } from './use-cases/fetch-requests.use-case';
@Module({
  imports: [InfraestructureModule],
  controllers: [RequestController],
  providers: [FetchRequestsUseCase],
})
export class RequestModule {}
