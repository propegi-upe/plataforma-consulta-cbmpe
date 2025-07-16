import { DocumentEntity } from '../entities/document.entity';

export abstract class DocumentRepository {
  abstract create(document: DocumentEntity): Promise<void>;
  abstract save(document: DocumentEntity): Promise<void>;
  abstract findByProcessId(processId: string): Promise<DocumentEntity[]>;
  abstract findById(id: string): Promise<DocumentEntity | null>;
}
