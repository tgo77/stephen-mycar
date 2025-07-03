import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// import { CookieSessoin } from 'cookie-session';
const cookieSession = require('cookie-session');

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 쿠키섹션설정
  app.use(
    cookieSession({
      keys: ['keys'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
