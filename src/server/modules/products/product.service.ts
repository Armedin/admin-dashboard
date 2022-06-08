import { Model } from 'mongoose';
import {
  Logger,
  ConflictException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);

  constructor() {}
}
