import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.getOrThrow<string>('app.port');
  const CLIENT = config.getOrThrow<string>('app.client');

  app.enableCors({
    origin: CLIENT,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
