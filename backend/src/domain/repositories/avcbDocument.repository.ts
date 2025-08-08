import { avcbDocument } from '../entities/avcbDocument.entity';

export interface AvcbDocumentRepository {
  findById(id: number): Promise<avcbDocument | null>;
  findAll(): Promise<avcbDocument[]>;
  findOneByQuery(query: Partial<avcbDocument>): Promise<avcbDocument | null>;
  create(data: Partial<avcbDocument>): Promise<avcbDocument>;
  findByNameOrCnpjOrCpf(
    name?: string,
    cnpj?: string,
    cpf?: string,
  ): Promise<avcbDocument[]>;
}
