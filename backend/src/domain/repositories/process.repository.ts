import { ProcessEntity } from '../entities/process.entity';

export interface ProcessesRepository {
  create(process: ProcessEntity): Promise<void>;
  save(process: ProcessEntity): Promise<void>;
  findById(id: string): Promise<ProcessEntity | null>;
  findByUserId(userId: string): Promise<ProcessEntity[]>;
  findByEstablishmentId(establishmentId: string): Promise<ProcessEntity[]>;
}
