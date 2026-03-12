import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Hace que solo se acepten las propiedades definidas en los DTOs
    forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no definidas en los DTOs
    transform: true, // Transforma los payloads a los tipos definidos en los DTOs (por ejemplo, convierte strings a números)
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
