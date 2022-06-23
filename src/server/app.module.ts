import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ProductsModule } from './modules/products/products.module';
import { ViewModule } from './modules/view/view.module';
import { BcryptModule } from './utilities/bcrypt/bcrypt.module';

@Module({
  imports: [
    BcryptModule,
    DatabaseModule,
    ConfigurationModule,
    ProductsModule,
    ProductCategoriesModule,
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
