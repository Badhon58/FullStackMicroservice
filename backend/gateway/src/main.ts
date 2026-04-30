import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Microservices')
    .setDescription('Microservices API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // START ALL microservices (NATS)
  await app.startAllMicroservices();
  
  const PORT = process.env.GATEWAY_PORT || 3000;
  await app.listen(PORT ?? 3000, () =>
    console.log(`Running on PORT ${PORT || 3000}`),
  );
}
bootstrap();
