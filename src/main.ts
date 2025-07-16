import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // validacion de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, //Lanza error si mandan campos extra
      transform: true, //Convierte automáticamente los datos en instancias de clase
    }),
  );

  await app.listen(3000);
}

bootstrap().catch((err) => {
  console.error('Error al iniciar la app:', err);
});
