import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend URL'i
    credentials: true,
  });
  await app.listen(process.env.HTTP_PORT ?? 3001);
}
bootstrap();
