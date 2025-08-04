import { RequirementsRepository } from 'src/domain/repositories/requirements.repository';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormRequirementEntity } from '../entities/typeorm-requirement.entity';
import { Requirement } from 'src/domain/entities/requirements.entity';
import { RequirementMapper } from '../mappers/requirements.mapper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormRequirementRepository implements RequirementsRepository {
  private paginationLimit: number;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TypeormRequirementEntity)
    private readonly repository: Repository<TypeormRequirementEntity>,
  ) {
    this.paginationLimit =
      this.configService.get<number>('PAGINATION_DEFAULT_LIMIT') || 100;
  }

  async findMany(query: {
    limit?: number;
    offset?: number;
  }): Promise<Requirement[]> {
    const limit = Math.min(
      query.limit ?? this.paginationLimit,
      this.paginationLimit,
    );
    const offset = query.offset ?? 0;

    const requirements = await this.repository.find({
      take: limit,
      skip: offset,
    });

    return requirements.map(RequirementMapper.toDomain);
  }
}
