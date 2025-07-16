import { Inject } from '@nestjs/common';
import { Document } from 'src/domain/entities/document.entity';
import { DocumentsRepository } from 'src/domain/repositories/documents.repository';

export type CreateDocumentUseCaseRequest = {
  path: string;
  entityId: string;
  type?: string;
  description?: string;
  fileSize?: number;
  name?: string;
};

export type CreateDocumentUseCaseResponse = {
  document: Document;
};

export class CreateDocumentUseCase {
  constructor(
    @Inject('DocumentsRepository')
    private readonly documentsRepository: DocumentsRepository,
  ) {}

  async execute({
    path,
    entityId,
    type,
    description,
    fileSize,
    name,
  }: CreateDocumentUseCaseRequest): Promise<CreateDocumentUseCaseResponse> {
    const document = new Document(
      path,
      entityId,
      type,
      description,
      fileSize,
      name,
    );
    await this.documentsRepository.create(document);

    return { document };
  }
}
