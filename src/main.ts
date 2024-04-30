import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.getOrThrow<string>('app.port');
  const CLIENT = config.getOrThrow<string>('app.client');
  const isProduction = config.get<string>('env') === 'production';

  app.enableCors({
    origin: isProduction
      ? (origin, cb) => {
          if (CLIENT === origin) {
            cb(null, true);
          } else {
            cb(new BadRequestException('Client is not allowed by CORS'));
          }
        }
      : '*',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
