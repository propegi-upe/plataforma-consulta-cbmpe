import type { EnterprisesRepository } from 'src/domain/repositories/enterprise.repository';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormEnterpriseEntity } from '../entities/typeorm-enterprise.entity';
import type { Enterprise } from 'src/domain/entities/enterprise.entity';
import { EnterpriseMapper } from '../mappers/enterprise.mapper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormEnterpriseRepository implements EnterprisesRepository {
  private paginationLimit: number;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TypeormEnterpriseEntity)
    private readonly repository: Repository<TypeormEnterpriseEntity>,
  ) {
    this.paginationLimit =
      this.configService.get<number>('PAGINATION_DEFAULT_LIMIT') || 100;
  }
  async findById(id: number): Promise<Enterprise | null> {
    const enterpriseEntity = await this.repository.findOne({ where: { id } });
    return enterpriseEntity
      ? EnterpriseMapper.toDomain(enterpriseEntity)
      : null;
  }

  async findMany(query: {
    limit?: number;
    offset?: number;
  }): Promise<Enterprise[]> {
    const limit = Math.min(
      query.limit ?? this.paginationLimit,
      this.paginationLimit,
    );
    const offset = query.offset ?? 0;

    const enterprises = await this.repository.find({
      take: limit,
      skip: offset,
    });

    return enterprises.map(EnterpriseMapper.toDomain);
  }

  async findByNameOrCnpjOrCpf(query: {
    search: string;
  }): Promise<Enterprise[]> {
    const { search } = query;
    const queryBuilder = this.repository.createQueryBuilder('enterprise');
    const lowerSearch = search.toLowerCase();

    queryBuilder
      .where('LOWER(enterprise.personName) LIKE :personName', {
        personName: `%${lowerSearch}%`,
      })
      .orWhere('enterprise.cnpj LIKE :cnpj', { cnpj: `%${search}%` })
      .orWhere('enterprise.cpf LIKE :cpf', { cpf: `%${search}%` })
      .orWhere('LOWER(enterprise.corporateName) LIKE :corporateName', {
        corporateName: `%${lowerSearch}%`,
      });

    const protocolId = Number(search);
    if (!isNaN(protocolId)) {
      queryBuilder.orWhere('enterprise.protocolId = :protocolId', {
        protocolId,
      });
    }

    const enterprises = await queryBuilder.getMany();
    return enterprises.map(EnterpriseMapper.toDomain);
  }

  async search(params: {
    personName?: string;
    cnpj?: string;
    cpf?: string;
    corporateName?: string;
    protocolId?: number;
    limit?: number;
    offset?: number;
  }): Promise<Enterprise[]> {
    const queryBuilder = this.repository.createQueryBuilder('enterprise');

    if (params.personName) {
      queryBuilder.andWhere('LOWER(enterprise.personName) LIKE :personName', {
        personName: `%${params.personName.toLowerCase()}%`,
      });
    }
    if (params.cnpj) {
      queryBuilder.andWhere('enterprise.cnpj LIKE :cnpj', {
        cnpj: `%${params.cnpj}%`,
      });
    }
    if (params.cpf) {
      queryBuilder.andWhere('enterprise.cpf LIKE :cpf', {
        cpf: `%${params.cpf}%`,
      });
    }
    if (params.corporateName) {
      queryBuilder.andWhere(
        'LOWER(enterprise.corporateName) LIKE :corporateName',
        {
          corporateName: `%${params.corporateName.toLowerCase()}%`,
        },
      );
    }
    if (params.protocolId !== undefined) {
      queryBuilder.andWhere('enterprise.protocolId = :protocolId', {
        protocolId: params.protocolId,
      });
    }

    const offset = params.offset ?? 0;
    const limit = Math.min(
      params.limit ?? this.paginationLimit,
      this.paginationLimit,
    );

    queryBuilder.skip(offset).take(limit);

    const enterprises = await queryBuilder.getMany();
    return enterprises.map(EnterpriseMapper.toDomain);
  }
}
