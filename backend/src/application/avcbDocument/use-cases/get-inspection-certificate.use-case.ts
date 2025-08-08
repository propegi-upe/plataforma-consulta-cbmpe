import { AvcbDocumentRepository } from 'src/domain/repositories/avcbDocument.repository';
import { avcbDocument } from 'src/domain/entities/avcbDocument.entity';
import { ResourceNotFound } from 'src/domain/errors/ResourceNotFound';
import { RESPONSE } from 'src/core/response/response.messages';
import { Inject } from '@nestjs/common';
import { AVCB_DOCUMENTS_REPOSITORY } from 'src/domain/repositories/tokens';

export interface GetavcbDocumentUseCaseRequest {
  id: number;
}

export interface GetavcbDocumentUseCaseResponse {
  avcbdocument: avcbDocument;
}

export class GetavcbDocumentUseCase {
  constructor(
    @Inject(AVCB_DOCUMENTS_REPOSITORY)
    private AvcbDocumentRepository: AvcbDocumentRepository,
  ) {}

  async execute({
    name,
    cnpj,
    cpf,
  }: {
    name?: string;
    cnpj?: string;
    cpf?: string;
  }): Promise<{ avcbdocuments: avcbDocument[] }> {
    const avcbdocuments =
      await this.AvcbDocumentRepository.findByNameOrCnpjOrCpf(name, cnpj, cpf);
    if (!avcbdocuments || avcbdocuments.length === 0) {
      throw new ResourceNotFound(RESPONSE.AVCB_DOCUMENTS.NOT_FOUND);
    }
    return { avcbdocuments };
  }
}
