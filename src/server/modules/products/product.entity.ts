import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column('decimal', { precision: 16, scale: 2 })
  price: number;

  @Column('json')
  @IsOptional()
  images: string[];

  @Column('json')
  @IsOptional()
  properties: { name: string; value: string }[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
