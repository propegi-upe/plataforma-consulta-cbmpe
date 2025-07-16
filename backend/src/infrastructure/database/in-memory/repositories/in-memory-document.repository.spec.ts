import { InMemoryDocumentRepository } from './in-memory-document.repository';
import { DocumentEntity } from 'src/domain/entities/document.entity';
import { DocumentFactory } from 'src/test/factories/document.factory';

describe('InMemoryDocumentRepository', () => {
  let documentRepository: InMemoryDocumentRepository;
  let documentFactory: DocumentFactory;

  beforeEach(() => {
    documentRepository = new InMemoryDocumentRepository();
    documentFactory = new DocumentFactory();
  });

  it('should be able to create a new document', async () => {
    // Arrange
    const documentProps = {
      documentType: 'Atestado de Vistoria',
      documentNumber: '12345/2025',
      issueDate: new Date(),
      expirationDate: new Date(),
      pdfFileUrl: 'http://example.com/doc.pdf',
      protocolNumber: 'PROT-001',
      status: 'Válido',
      digitalSignature: 'abc-def-ghi',
      processId: 'process-01',
    };
    const newDocument = documentFactory.create(documentProps);

    // Act
    await documentRepository.create(newDocument);

    // Assert
    const foundDocument = await documentRepository.findById(newDocument.id);
    expect(foundDocument).toEqual(newDocument);
  });

  // NOVO TESTE: para o método save (atualização)
  it('should be able to save (update) an existing document', async () => {
    // Arrange
    const documentProps = {
      documentType: 'Atestado de Vistoria',
      documentNumber: '12345/2025',
      issueDate: new Date(),
      expirationDate: new Date(),
      pdfFileUrl: 'http://example.com/doc.pdf',
      protocolNumber: 'PROT-001',
      status: 'Válido',
      digitalSignature: 'abc-def-ghi',
      processId: 'process-01',
    };
    const document = documentFactory.create(documentProps);
    await documentRepository.create(document); // Primeiro, criamos o documento

    // Act
    document.status = 'Expirado'; // Modificamos o status
    await documentRepository.save(document); // Salvamos a entidade modificada

    // Assert
    const updatedDocument = await documentRepository.findById(document.id);
    expect(updatedDocument?.status).toBe('Expirado');
  });

  it('should return null when a document is not found by id', async () => {
    const foundDocument = await documentRepository.findById('non-existent-id');
    expect(foundDocument).toBeNull();
  });

  it('should be able to find documents by processId', async () => {
    // Arrange
    const doc1 = documentFactory.create({
      documentType: 'Doc A',
      documentNumber: 'A1',
      issueDate: new Date(),
      expirationDate: new Date(),
      pdfFileUrl: '',
      protocolNumber: 'P1',
      status: 'OK',
      digitalSignature: '',
      processId: 'process-123',
    });
    const doc2 = documentFactory.create({
      documentType: 'Doc B',
      documentNumber: 'B2',
      issueDate: new Date(),
      expirationDate: new Date(),
      pdfFileUrl: '',
      protocolNumber: 'P2',
      status: 'OK',
      digitalSignature: '',
      processId: 'process-456',
    });
    const doc3 = documentFactory.create({
      documentType: 'Doc C',
      documentNumber: 'C3',
      issueDate: new Date(),
      expirationDate: new Date(),
      pdfFileUrl: '',
      protocolNumber: 'P3',
      status: 'OK',
      digitalSignature: '',
      processId: 'process-123',
    });

    await documentRepository.create(doc1);
    await documentRepository.create(doc2);
    await documentRepository.create(doc3);

    // Act
    const foundDocuments =
      await documentRepository.findByProcessId('process-123');

    // Assert
    expect(foundDocuments).toHaveLength(2);
    expect(foundDocuments).toContain(doc1);
    expect(foundDocuments).toContain(doc3);
  });
});
