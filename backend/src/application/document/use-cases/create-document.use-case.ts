import { Injectable, Inject } from '@nestjs/common';
import { DocumentEntity } from 'src/domain/entities/document.entity';
import { DocumentFactory } from 'src/test/factories/document.factory';
import { DocumentRepository } from 'src/domain/repositories/document.repository';
import { CreateDocumentDto } from '../dtos/create-document.dto';
import { DOCUMENTS_REPOSITORY } from 'src/domain/repositories/tokens';

export type CreateDocumentUseCaseResponse = {
  document: DocumentEntity;
};

@Injectable()
export class CreateDocumentUseCase {
  constructor(
    @Inject(DOCUMENTS_REPOSITORY)
    private readonly documentsRepository: DocumentRepository,

    private readonly documentFactory: DocumentFactory,
  ) {}

  async execute(
    dto: CreateDocumentDto,
  ): Promise<CreateDocumentUseCaseResponse> {
    const document = this.documentFactory.create(dto);

    await this.documentsRepository.create(document);

    return { document };
  }
}
