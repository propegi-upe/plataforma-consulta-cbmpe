import { EstablishmentEntity } from '../entities/establishment.entity';

export interface EstablishmentsRepository {
  create(establishment: EstablishmentEntity): Promise<EstablishmentEntity>;
  findById(id: string): Promise<EstablishmentEntity | null>;
  findByUserId(userId: string): Promise<EstablishmentEntity[]>;
  update(establishment: EstablishmentEntity): Promise<EstablishmentEntity>;
  delete(id: string): Promise<void>;
  findAll(): Promise<EstablishmentEntity[]>;
}
