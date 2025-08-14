import { AvcbDocumentRepository } from 'src/domain/repositories/avcbDocument.repository';
import { avcbDocument } from 'src/domain/entities/avcbDocument.entity';

export class InMemoryAvcbDocumentRepository implements AvcbDocumentRepository {
  private avcbDocuments: Map<string, avcbDocument> = new Map();

  async findById(id: number): Promise<avcbDocument | null> {
    return this.avcbDocuments.get(String(id)) ?? null;
  }

  async findAll(): Promise<avcbDocument[]> {
    return Array.from(this.avcbDocuments.values());
  }

  async findOneByQuery(
    query: Partial<avcbDocument>,
  ): Promise<avcbDocument | null> {
    for (const doc of this.avcbDocuments.values()) {
      let matches = true;
      for (const key in query) {
        if (
          query[key as keyof avcbDocument] !== undefined &&
          doc[key as keyof avcbDocument] !== query[key as keyof avcbDocument]
        ) {
          matches = false;
          break;
        }
      }
      if (matches) {
        return doc;
      }
    }
    return null;
  }

  async create(data: Partial<avcbDocument>): Promise<avcbDocument> {
    const id = data.idReqVisto ?? Math.random().toString(36).substring(2, 15);
    const avcbDocument: avcbDocument = {
      ...data,
      id,
    } as avcbDocument;
    this.avcbDocuments.set(String(avcbDocument.idReqVisto), avcbDocument);
    return avcbDocument;
  }

  async findByNameOrCnpjOrCpf(
    name?: string,
    cnpj?: string,
    cpf?: string,
  ): Promise<avcbDocument[]> {
    const results: avcbDocument[] = [];
    for (const doc of this.avcbDocuments.values()) {
      if (
        (name && doc.applicantName?.includes(name)) ||
        (cnpj && doc.applicantCpfCnpj === cnpj) ||
        (cpf && doc.applicantCpfCnpj === cpf)
      ) {
        results.push(doc);
      }
    }
    return results;
  }
}
