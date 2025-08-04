import { Module } from '@nestjs/common';
import { InfraestructureModule } from 'src/infraestructure/infraestructure.module';
import { RequirementController } from './requirement.controller';
import { FetchRequirementsUseCase } from './use-cases/fetch-requirements.use-case';
@Module({
  imports: [InfraestructureModule],
  controllers: [RequirementController],
  providers: [FetchRequirementsUseCase],
})
export class RequirementModule {}
