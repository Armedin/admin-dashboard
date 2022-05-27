import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        MONGODB_HOST: Joi.string().required(),
        MONGODB_USERNAME: Joi.string().required(),
        MONGODB_PASSWORD: Joi.string().required(),
        MONGODB_DATABASE: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigurationModule {}
