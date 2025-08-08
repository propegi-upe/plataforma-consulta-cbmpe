import { Module } from '@nestjs/common';
import { InfraestructureModule } from 'src/infraestructure/infraestructure.module';
import { EnterpriseController } from './enterprise.controller';
import { FetchEnterprisesUseCase } from './use-cases/fetch-enterprises.use-case';
import { GetEnterpriseUseCase } from './use-cases/get-enterprise.use-case';

@Module({
  imports: [InfraestructureModule],
  controllers: [EnterpriseController],
  providers: [FetchEnterprisesUseCase, GetEnterpriseUseCase],
})
export class EnterpriseModule {}
