import { Injectable } from '@nestjs/common';
import { DocumentEntity } from 'src/domain/entities/document.entity';
// Omit<> cria um tipo com todas as propriedades de DocumentEntity, exceto as que são geradas automaticamente
type CreateDocumentProps = Omit<
  DocumentEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

@Injectable()
export class DocumentFactory {
  create(props: CreateDocumentProps): DocumentEntity {
    return new DocumentEntity(
      props.documentType,
      props.documentNumber,
      props.issueDate,
      props.expirationDate,
      props.pdfFileUrl,
      props.protocolNumber,
      props.status,
      props.digitalSignature,
      props.processId,
    );
  }
}
