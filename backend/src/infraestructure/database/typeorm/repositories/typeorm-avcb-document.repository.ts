import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { TypeormAvcbDocumentView } from '../entities/typeorm-avcbDocument.entity';
import { AvcbDocumentMapper } from '../mappers/avcbDocument.mapper';
import type { AvcbDocumentRepository } from 'src/domain/repositories/avcbDocument.repository';
import type { avcbDocument } from 'src/domain/entities/avcbDocument.entity';

@Injectable()
export class TypeormavcbDocumentRepository implements AvcbDocumentRepository {
  constructor(
    @InjectRepository(TypeormAvcbDocumentView)
    private readonly repository: Repository<TypeormAvcbDocumentView>,
  ) {}

  async findById(id: number): Promise<avcbDocument | null> {
    const entity = await this.repository.findOne({ where: { idReqVisto: id } });
    return entity ? AvcbDocumentMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<avcbDocument[]> {
    const entities = await this.repository.find();
    return entities.map(AvcbDocumentMapper.toDomain);
  }

  async findOneByQuery(
    query: Partial<avcbDocument>,
  ): Promise<avcbDocument | null> {
    const entity = await this.repository.findOne({ where: query });
    return entity ? AvcbDocumentMapper.toDomain(entity) : null;
  }

  async create(data: Partial<avcbDocument>): Promise<avcbDocument> {
    const entity = this.repository.create(data as any);
    const saved = await this.repository.save(entity);
    const savedEntity = Array.isArray(saved) ? saved[0] : saved;
    return AvcbDocumentMapper.toDomain(savedEntity);
  }

  async findByNameOrCnpjOrCpf(
    name?: string,
    cnpj?: string,
    cpf?: string,
  ): Promise<avcbDocument[]> {
    const queryBuilder = this.repository.createQueryBuilder('avcbDocument');

    if (name) {
      queryBuilder.orWhere('avcbDocument.applicantName ILIKE :name', {
        name: `%${name}%`,
      });
    }
    if (cnpj) {
      queryBuilder.orWhere('avcbDocument.applicantCpfCnpj ILIKE :cnpj', {
        cnpj: `%${cnpj}%`,
      });
    }
    if (cpf) {
      queryBuilder.orWhere('avcbDocument.applicantCpfCnpj ILIKE :cpf', {
        cpf: `%${cpf}%`,
      });
    }

    const entities = await queryBuilder.getMany();
    return entities.map(AvcbDocumentMapper.toDomain);
  }
}
