import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly thumbnail: string;

  @IsNumber()
  readonly price: number;

  readonly properties?: { name: string; value: string }[];

  readonly images?: string[];
}
