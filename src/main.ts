import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'debug', 'log', 'verbose'], });
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();

