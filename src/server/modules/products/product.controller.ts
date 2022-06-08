import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import LocalFilesInterceptor from '../../interceptors/local-files.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './product.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  async getProducts() {
    return 'ok';
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    console.log(dto);
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
    // console.log(files);
  }
}
