import { IsUUID, IsNotEmpty } from 'class-validator';

export class GetEnterpriseDto {
  @IsUUID()
  @IsNotEmpty()
  id: string; // O ID do estabelecimento que queremos buscar
}
