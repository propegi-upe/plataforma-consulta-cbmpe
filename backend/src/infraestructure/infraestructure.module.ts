import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROJECTS_REPOSITORY } from 'src/domain/repositories/tokens';
import { DatabaseModule } from './database/database.module';
import { TypeormProjectEntity } from './database/typeorm/entities/typeorm-project.entity';
import { TypeormProjectRepository } from './database/typeorm/repositories/typeorm-project.repository';
import { TypeormRequirementEntity } from './database/typeorm/entities/typeorm-requirement.entity';
import { TypeormRequirementRepository } from './database/typeorm/repositories/typeorm-requirement.repository';
import { REQUIREMENTS_REPOSITORY } from 'src/domain/repositories/tokens';

const REPOSITORIES = [
  {
    provide: PROJECTS_REPOSITORY,
    useClass: TypeormProjectRepository,
  },
  {
    provide: REQUIREMENTS_REPOSITORY,
    useClass: TypeormRequirementRepository,
  },
];

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([TypeormProjectEntity, TypeormRequirementEntity]),
  ],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class InfraestructureModule {}
