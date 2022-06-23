import { IsDecimal, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly thumbnail: string;

  @IsDecimal()
  readonly price: number;

  @IsOptional()
  readonly properties?: { name: string; value: string }[];

  @IsOptional()
  readonly images?: string[];

  @IsString()
  readonly category_id: string;
}
