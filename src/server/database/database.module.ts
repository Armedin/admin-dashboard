import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      /**
       * synchronize: true is dangerous in production!
       * Could lead to data loss. Should do migrations instead.
       * see https://github.com/typeorm/typeorm/blob/master/docs/migrations.md
       */
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
