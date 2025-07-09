import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

// 미들웨어 추가로 인터셉터 삭제
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

// 미들웨어 추가
import { MiddlewareConsumer } from '@nestjs/common';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (_config: ConfigService) => {
        return {
          secret: _config.get<string>('COOKIE_KEY'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // 미들웨어 추가로 인터셉트 삭제
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // },
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
