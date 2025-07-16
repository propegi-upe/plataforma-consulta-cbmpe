import { DocumentEntity } from 'src/domain/entities/document.entity';
import { DocumentRepository } from 'src/domain/repositories/document.repository';

export class InMemoryDocumentRepository implements DocumentRepository {
  private documents: Map<string, DocumentEntity> = new Map();

  async create(document: DocumentEntity): Promise<void> {
    this.documents.set(document.id, document);
  }

  async save(document: DocumentEntity): Promise<void> {
    this.documents.set(document.id, document);
  }

  async findByProcessId(processId: string): Promise<DocumentEntity[]> {
    return Array.from(this.documents.values()).filter(
      (doc) => doc.processId === processId,
    );
  }

  async findById(id: string): Promise<DocumentEntity | null> {
    return this.documents.get(id) ?? null;
  }
}
