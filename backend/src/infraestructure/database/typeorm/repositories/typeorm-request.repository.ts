import { RequestsRepository } from 'src/domain/repositories/request.repository';
import { ILike, type Repository } from 'typeorm';
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

  async findById(id: number): Promise<Request | null> {
    const request = await this.repository.findOne({ where: { id } });

    return request ? RequestMapper.toDomain(request) : null;
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

  async findManyByCpf(cpf: string): Promise<Request[]> {
    const requests = await this.repository.find({ where: { cpf } });

    return requests.map(RequestMapper.toDomain);
  }

  async findManyByCnpj(cnpj: string): Promise<Request[]> {
    const requests = await this.repository.find({ where: { cnpj } });

    return requests.map(RequestMapper.toDomain);
  }

  async findManyByPersonNameOrCorporateName(
    searchText: string,
  ): Promise<Request[]> {
    const requests = await this.repository.find({
      where: [
        { personName: ILike(`%${searchText}%`) },
        { corporateName: ILike(`%${searchText}%`) },
      ],
    });

    return requests.map(RequestMapper.toDomain);
  }

  async findManyByProtocolId(protocolId: number): Promise<Request[]> {
    const requests = await this.repository.find({ where: { protocolId } });

    return requests.map(RequestMapper.toDomain);
  }
}
