import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../product-categories/product-category.entity';

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

  @ManyToOne(() => ProductCategory, productCategory => productCategory.products)
  @JoinColumn({ name: 'category_id' })
  category?: ProductCategory;

  @RelationId((product: Product) => product.category)
  @Column({ nullable: true })
  @Index()
  category_id?: string;
}
