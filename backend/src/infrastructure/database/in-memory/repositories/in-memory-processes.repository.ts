import { Injectable } from '@nestjs/common';
import { ProcessEntity } from 'src/domain/entities/process.entity';
import { ProcessesRepository } from 'src/domain/repositories/process.repository';

@Injectable()
export class InMemoryProcessesRepository implements ProcessesRepository {
  private items: Map<string, ProcessEntity> = new Map();

  async create(process: ProcessEntity): Promise<void> {
    this.items.set(process.id, process);
  }

  async save(process: ProcessEntity): Promise<void> {
    this.items.set(process.id, process);
  }

  async findById(id: string): Promise<ProcessEntity | null> {
    return this.items.get(id) ?? null;
  }

  async findByUserId(userId: string): Promise<ProcessEntity[]> {
    return Array.from(this.items.values()).filter(
      (item) => item.userId === userId,
    );
  }

  async findByEstablishmentId(
    establishmentId: string,
  ): Promise<ProcessEntity[]> {
    return Array.from(this.items.values()).filter(
      (item) => item.establishmentId === establishmentId,
    );
  }
}
