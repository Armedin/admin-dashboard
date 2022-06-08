import { IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  readonly language: string;
}
