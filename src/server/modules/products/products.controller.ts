import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import LocalFilesInterceptor from '../../interceptors/local-files.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  async getProducts() {
    const products = await this.productsService.findAllProducts();
    return products;
  }

  @Get(':id')
  async getProductById(@Param('id') productId: string) {
    const product = await this.productsService.findProductById(productId);
    return product;
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const product = await this.productsService.saveProduct(dto);
    return product;
  }

  @Put(':id')
  async updateProductById(
    @Param('id') productId: string,
    @Body() dto: UpdateProductDto
  ) {
    const product = await this.productsService.updateProductById(
      productId,
      dto
    );
    return product;
  }

  @Post('upload')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'files',
      path: '/',
      fileFilter: (req, file, callback) =>
        file.mimetype.includes('image')
          ? callback(null, true)
          : callback(
              new BadRequestException('Only image files are allowed'),
              false
            ),
    })
  )
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {
      uploads: files.map(file => ({
        url: file.filename,
      })),
    };
  }
}
