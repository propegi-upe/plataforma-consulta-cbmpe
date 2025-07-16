import { EstablishmentsRepository } from '@src/domain/repositories/establishments.repository';
import { EstablishmentEntity } from '@src/domain/entities/establishment-entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryEstablishmentsRepository
  implements EstablishmentsRepository
{
  private items: Map<string, EstablishmentEntity> = new Map();

  async create(establishment: EstablishmentEntity): Promise<void> {
    this.items.set(establishment.id, establishment);
  }

  async save(establishment: EstablishmentEntity): Promise<void> {
    this.items.set(establishment.id, establishment);
  }

  async findById(id: string): Promise<EstablishmentEntity | null> {
    return this.items.get(id) ?? null;
  }

  async findByUserId(userId: string): Promise<EstablishmentEntity[]> {
    return Array.from(this.items.values()).filter(
      (item) => item.userId === userId,
    );
  }
}
