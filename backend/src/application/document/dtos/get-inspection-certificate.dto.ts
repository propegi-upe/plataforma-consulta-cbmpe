import { IsUUID, IsNotEmpty } from 'class-validator';

export class GetInspectionCertificateDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
