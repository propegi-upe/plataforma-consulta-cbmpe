import { EstablishmentEntity } from 'src/domain/entities/establishment.entity';
import { EstablishmentsRepository } from 'src/domain/repositories/establishments.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryEstablishmentsRepository
  implements EstablishmentsRepository
{
  private items: Map<string, EstablishmentEntity> = new Map();

  async create(
    establishment: EstablishmentEntity,
  ): Promise<EstablishmentEntity> {
    this.items.set(establishment.id, establishment);

    return establishment;
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

  async update(
    establishment: EstablishmentEntity,
  ): Promise<EstablishmentEntity> {
    this.items.set(establishment.id, establishment);
    // CORREÇÃO: Retorna a entidade atualizada para cumprir o contrato da interface.
    return establishment;
  }

  async delete(id: string): Promise<void> {
    this.items.delete(id);
  }

  async findAll(): Promise<EstablishmentEntity[]> {
    return Array.from(this.items.values());
  }
}
