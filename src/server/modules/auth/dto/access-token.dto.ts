import { IsIn, IsOptional, IsString } from 'class-validator';

export class AccessTokenDto {
  @IsString()
  accessToken: string;
}
