import { IsEmail, IsString } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
