import { IsUUID, IsNotEmpty } from 'class-validator';

export class GetRequestDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
