import { InMemoryDocumentRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory-document.repository';
import { DocumentFactory } from 'src/test/factories/document.factory';
import { GetInspectionCertificateUseCase } from './get-inspection-certificate.use-case';
import { NotFoundException } from '@nestjs/common';
import { DocumentEntity } from 'src/domain/entities/document.entity';

describe('GetInspectionCertificateUseCase', () => {
  let documentsRepository: InMemoryDocumentRepository;
  let documentFactory: DocumentFactory;

  let getInspectionCertificateUseCase: GetInspectionCertificateUseCase;

  beforeEach(() => {
    documentsRepository = new InMemoryDocumentRepository();
    documentFactory = new DocumentFactory();

    getInspectionCertificateUseCase = new GetInspectionCertificateUseCase(
      documentsRepository,
    );
  });

  it('should be able to get a document by its id', async () => {
    // Arrange
    const documentProps = {
      documentType: 'Atestado de Vistoria',
      documentNumber: 'AVCB-2025-001',
      issueDate: new Date(),
      expirationDate: new Date(),
      pdfFileUrl: 'http://example.com/avcb.pdf',
      protocolNumber: 'PROT-001',
      status: 'Válido',
      digitalSignature: 'signature-hash',
      processId: 'process-123',
    };
    const newDocument = documentFactory.create(documentProps);
    await documentsRepository.create(newDocument);

    const result = await getInspectionCertificateUseCase.execute({
      id: newDocument.id,
    });

    expect(result.document).toBeInstanceOf(DocumentEntity);
    expect(result.document.id).toBe(newDocument.id);
  });

  it('should throw a NotFoundException when the document does not exist', async () => {
    await expect(
      getInspectionCertificateUseCase.execute({ id: 'non-existent-id' }),
    ).rejects.toThrow(NotFoundException);
  });
});
