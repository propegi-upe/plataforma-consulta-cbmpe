import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString() @IsNotEmpty() name: string;
  @IsEmail() @IsNotEmpty() email: string;
  @IsString() @IsNotEmpty() phone: string;
  @IsString() @IsNotEmpty() profileType: string;
  @IsString() @IsNotEmpty() cpfCnpj: string;
  @IsString() @IsNotEmpty() govbrId: string;
}
