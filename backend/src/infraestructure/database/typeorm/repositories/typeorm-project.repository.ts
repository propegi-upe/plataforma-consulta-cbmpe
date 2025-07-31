import type { ProjectsRepository } from 'src/domain/repositories/projects.repository';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormProjectEntity } from '../entities/typeorm-project.entity';
import type { Project } from 'src/domain/entities/project.entity';
import { ProjectMapper } from '../mappers/project.mapper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormProjectRepository implements ProjectsRepository {
  private paginationLimit: number;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TypeormProjectEntity)
    private readonly repository: Repository<TypeormProjectEntity>,
  ) {
    this.paginationLimit =
      this.configService.get<number>('PAGINATION_DEFAULT_LIMIT') || 100;
  }
  async findById(id: number): Promise<Project | null> {
    const projectEntity = await this.repository.findOne({ where: { id } });
    return projectEntity ? ProjectMapper.toDomain(projectEntity) : null;
  }

  async findMany(query: {
    limit?: number;
    offset?: number;
  }): Promise<Project[]> {
    const limit = Math.min(
      query.limit ?? this.paginationLimit,
      this.paginationLimit,
    );
    const offset = query.offset ?? 0;

    const projects = await this.repository.find({
      take: limit,
      skip: offset,
    });

    return projects.map(ProjectMapper.toDomain);
  }
}
