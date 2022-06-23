import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductCategory } from './product-category.entity';

@Injectable()
export class ProductCategoriesService {
  private logger = new Logger(ProductCategoriesService.name);

  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>
  ) {}

  async getAllCategories(): Promise<ProductCategory[]> {
    const categories = await this.productCategoryRepository.find();
    return categories;
  }

  async saveCategory(categoryDto: CreateCategoryDto): Promise<ProductCategory> {
    const category = await this.productCategoryRepository.save(categoryDto);
    return category;
  }
}
