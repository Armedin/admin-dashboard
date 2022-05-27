import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const username = configService.get('MONGODB_USERNAME');
        const password = configService.get('MONGODB_PASSWORD');
        const host = configService.get('MONGODB_HOST');
        const database = configService.get('MONGODB_DATABASE');

        return {
          uri: `mongodb://${username}:${password}@${host}:27017/${database}?`,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
