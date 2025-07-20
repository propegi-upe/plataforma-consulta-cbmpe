import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DocumentEntity } from 'src/domain/entities/document.entity';
import { DocumentRepository } from 'src/domain/repositories/document.repository';
import { GetInspectionCertificateDto } from '../dtos/get-inspection-certificate.dto';
import { DOCUMENTS_REPOSITORY } from 'src/domain/repositories/tokens';

export type GetInspectionCertificateUseCaseResponse = {
  document: DocumentEntity;
};

@Injectable()
export class GetInspectionCertificateUseCase {
  constructor(
    @Inject(DOCUMENTS_REPOSITORY)
    private readonly documentsRepository: DocumentRepository,
  ) {}

  async execute({
    id,
  }: GetInspectionCertificateDto): Promise<GetInspectionCertificateUseCaseResponse> {
    const document = await this.documentsRepository.findById(id);

    if (!document) {
      throw new NotFoundException(`Document with ID "${id}" not found.`);
    }

    return { document };
  }
}
