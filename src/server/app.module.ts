import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ViewModule } from './modules/view/view.module';
import { BcryptModule } from './utilities/bcrypt/bcrypt.module';

@Module({
  imports: [
    BcryptModule,
    // DatabaseModule,
    ConfigurationModule,
    // AuthModule,
    // UserModule,
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
