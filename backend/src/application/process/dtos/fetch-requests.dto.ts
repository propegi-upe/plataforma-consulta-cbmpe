import { IsUUID, IsNotEmpty } from 'class-validator';

export class FetchRequestsDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
