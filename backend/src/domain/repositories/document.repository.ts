import { DocumentEntity } from '../entities/document.entity';

export interface DocumentRepository {
  create(document: DocumentEntity): Promise<void>;
  save(document: DocumentEntity): Promise<void>;
  findByProcessId(processId: string): Promise<DocumentEntity[]>;
  findById(id: string): Promise<DocumentEntity | null>;
}
