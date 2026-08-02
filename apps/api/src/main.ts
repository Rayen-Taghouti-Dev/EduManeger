import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

function resolveCorsOrigins(): string | string[] {
  const raw = process.env.CORS_ORIGIN ?? 'http://localhost:3000';
  const origins = raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    return 'http://localhost:3000';
  }

  return origins.length === 1 ? origins[0]! : origins;
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const jwtSecret = process.env.JWT_ACCESS_SECRET?.trim();
    if (!jwtSecret || jwtSecret === 'change-me-to-a-strong-random-secret-min-32-chars') {
      throw new Error(
        'JWT_ACCESS_SECRET must be set to a strong secret in production (min 32 characters).',
      );
    }

    if (!process.env.CORS_ORIGIN?.trim()) {
      throw new Error(
        'CORS_ORIGIN must be set in production to your Vercel frontend origin(s), comma-separated if multiple.',
      );
    }

    if (!process.env.DATABASE_URL?.trim()) {
      throw new Error('DATABASE_URL must be set in production.');
    }
  }

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
    origin: resolveCorsOrigins(),
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

  const port = Number(process.env.PORT ?? process.env.API_PORT ?? 4000);
  await app.listen(port, '0.0.0.0');

  logger.log(`EduManager API listening on 0.0.0.0:${port}`);
  logger.log(`Health check at /api/v1/health`);
  logger.log(`Swagger docs at /api/docs`);
}

bootstrap();
