import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

const cookieSession = require('cookie-session');

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './users/entities/user.entity';
import { Report } from './reports/report.entity';
import dbConfig from '../ormconfig.js';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { GatewayModule } from './gateway/gateway.module';
import { SocketModule } from './socket/socket.module';
// import { TypeOrmExModule } from './repositories/typeorm-ex.module';
import { UserAuthorityRepository } from './users/repositories/user-authority.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       entities: [User, Report],
    //       synchronize: true,
    //     };
    //   },
    // }),

    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true,
    // }),
    // TypeOrmExModule.forCustomRepository([UserAuthorityRepository]),
    UsersModule,
    ReportsModule,
    GatewayModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
  // exports: [TypeOrmModule],
})
export class AppModule {
  constructor(private _config: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this._config.get<string>('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
