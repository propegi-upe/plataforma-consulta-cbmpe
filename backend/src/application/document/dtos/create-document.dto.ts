import { IsString, IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @IsString() @IsNotEmpty() documentType: string;
  @IsString() @IsNotEmpty() documentNumber: string;
  @IsDateString() issueDate: Date;
  @IsDateString() expirationDate: Date;
  @IsString() @IsNotEmpty() pdfFileUrl: string;
  @IsString() @IsNotEmpty() protocolNumber: string;
  @IsString() @IsNotEmpty() status: string;
  @IsString() digitalSignature: string;
  @IsUUID() @IsNotEmpty() processId: string;
}
