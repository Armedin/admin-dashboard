import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { ViewModule } from './modules/view/view.module';
import { BcryptModule } from './utilities/bcrypt/bcrypt.module';

@Module({
  imports: [
    BcryptModule,
    DatabaseModule,
    ConfigurationModule,
    ProductsModule,
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
