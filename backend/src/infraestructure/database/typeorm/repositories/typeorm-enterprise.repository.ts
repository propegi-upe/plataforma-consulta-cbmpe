import type { EnterprisesRepository } from 'src/domain/repositories/enterprise.repository';
import { ILike, type Repository } from 'typeorm';
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

  async findManyByCpf(cpf: string): Promise<Enterprise[]> {
    const enterprises = await this.repository.find({ where: { cpf } });

    return enterprises.map(EnterpriseMapper.toDomain);
  }

  async findManyByCnpj(cnpj: string): Promise<Enterprise[]> {
    const enterprises = await this.repository.find({ where: { cnpj } });

    return enterprises.map(EnterpriseMapper.toDomain);
  }

  async findManyByProtocolId(protocolId: number): Promise<Enterprise[]> {
    const enterprises = await this.repository.find({ where: { protocolId } });

    return enterprises.map(EnterpriseMapper.toDomain);
  }

  async findManyByPersonNameOrCorporateName(
    searchText: string,
  ): Promise<Enterprise[]> {
    const enterprises = await this.repository.find({
      where: [
        { personName: ILike(`%${searchText}%`) },
        { corporateName: ILike(`%${searchText}%`) },
      ],
    });

    return enterprises.map(EnterpriseMapper.toDomain);
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
}
