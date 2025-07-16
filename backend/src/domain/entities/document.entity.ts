import { Base } from './base.entity';

export class DocumentEntity extends Base {
  // Specific attributes of the Document, as per the diagram
  public documentType: string;
  public documentNumber: string;
  public issueDate: Date;
  public expirationDate: Date;
  public pdfFileUrl: string;
  public protocolNumber: string;
  public status: string; // 'status' is clear enough within the DocumentEntity context
  public digitalSignature: string;

  // Foreign key for the relationship with Process (Process 1 ---- 0..* Document)
  public processId: string;

  constructor(
    documentType: string,
    documentNumber: string,
    issueDate: Date,
    expirationDate: Date,
    pdfFileUrl: string,
    protocolNumber: string,
    status: string,
    digitalSignature: string,
    processId: string,
  ) {
    super(); // Ensures the Base constructor is called (handling createdAt)

    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.issueDate = issueDate;
    this.expirationDate = expirationDate;
    this.pdfFileUrl = pdfFileUrl;
    this.protocolNumber = protocolNumber;
    this.status = status;
    this.digitalSignature = digitalSignature;
    this.processId = processId;
  }
}
