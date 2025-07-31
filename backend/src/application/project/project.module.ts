import { Module } from '@nestjs/common';
import { InfraestructureModule } from 'src/infraestructure/infraestructure.module';
import { ProjectController } from '../project/project.controller';
import { FetchProjectsUseCase } from '../project/use-cases/fetch-projects.use-case';
import { GetProjectUseCase } from './use-cases/get-project.use-case';

@Module({
  imports: [InfraestructureModule],
  controllers: [ProjectController],
  providers: [FetchProjectsUseCase, GetProjectUseCase],
})
export class ProjectModule {}
