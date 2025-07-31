import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PROJECTS_REPOSITORY } from 'src/domain/repositories/tokens';
import { DatabaseModule } from './database/database.module';
import { TypeormProjectEntity } from './database/typeorm/entities/typeorm-project.entity';
import { TypeormProjectRepository } from './database/typeorm/repositories/typeorm-project.repository';

const REPOSITORIES = [
  {
    provide: PROJECTS_REPOSITORY,
    useClass: TypeormProjectRepository,
  },
];

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([TypeormProjectEntity])],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class InfraestructureModule {}
