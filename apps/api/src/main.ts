import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('EduManager Pro API')
    .setDescription('Enterprise SaaS platform for private schools')
    .setVersion('0.1.0')
    .addBearerAuth()
    .addCookieAuth(process.env.AUTH_REFRESH_COOKIE_NAME ?? 'edumanager_refresh_token')
    .build();

  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  const port = process.env.API_PORT ?? process.env.PORT ?? 4000;
  await app.listen(port);

  console.log(`EduManager API running on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api/docs`);
}

bootstrap();
