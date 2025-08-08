import { RequestsRepository } from 'src/domain/repositories/request.repository';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormRequestEntity } from '../entities/typeorm-request.entity';
import { Request } from 'src/domain/entities/request.entity';
import { RequestMapper } from '../mappers/request.mapper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormRequestRepository implements RequestsRepository {
  private paginationLimit: number;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(TypeormRequestEntity)
    private readonly repository: Repository<TypeormRequestEntity>,
  ) {
    this.paginationLimit =
      this.configService.get<number>('PAGINATION_DEFAULT_LIMIT') || 100;
  }

  async findMany(query: {
    limit?: number;
    offset?: number;
  }): Promise<Request[]> {
    const limit = Math.min(
      query.limit ?? this.paginationLimit,
      this.paginationLimit,
    );
    const offset = query.offset ?? 0;

    const requests = await this.repository.find({
      take: limit,
      skip: offset,
    });

    return requests.map(RequestMapper.toDomain);
  }

  async findById(id: number): Promise<Request | null> {
    const request = await this.repository.findOneBy({
      id_protc_fk: String(id),
    });
    return request ? RequestMapper.toDomain(request) : null;
  }

  async findByNameOrCnpjOrCpf(query: { search: string }): Promise<Request[]> {
    const search = query.search;
    const entities = await this.repository
      .createQueryBuilder('request')
      .where('request.nm_pess LIKE :search', { search: `%${search}%` })
      .orWhere('request.nr_cnpj LIKE :search', { search: `%${search}%` })
      .orWhere('request.nr_cpf LIKE :search', { search: `%${search}%` })
      .getMany();

    return entities.map(RequestMapper.toDomain);
  }

  async search(params: {
    id_protc_fk?: string;
    nm_pess?: string;
    nr_cpf?: string;
    nr_cnpj?: string;
    ds_titul_estab?: string;
  }): Promise<Request[]> {
    const qb = this.repository.createQueryBuilder('request');

    if (params.id_protc_fk) {
      qb.andWhere('request.id_protc_fk = :id_protc_fk', {
        id_protc_fk: params.id_protc_fk,
      });
    }
    if (params.nm_pess) {
      qb.andWhere('request.nm_pess LIKE :nm_pess', {
        nm_pess: `%${params.nm_pess}%`,
      });
    }
    if (params.nr_cpf) {
      qb.andWhere('request.nr_cpf = :nr_cpf', { nr_cpf: params.nr_cpf });
    }
    if (params.nr_cnpj) {
      qb.andWhere('request.nr_cnpj = :nr_cnpj', { nr_cnpj: params.nr_cnpj });
    }
    if (params.ds_titul_estab) {
      qb.andWhere('request.ds_titul_estab LIKE :ds_titul_estab', {
        ds_titul_estab: `%${params.ds_titul_estab}%`,
      });
    }

    const entities = await qb.getMany();
    return entities.map(RequestMapper.toDomain);
  }
}
