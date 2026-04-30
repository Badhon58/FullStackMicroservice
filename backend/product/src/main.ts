import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const env = process.env.ENVIRONMENT;

  const NATS_URL =
    env === 'LOCAL' ? process.env.NATS_URL_LOCAL : process.env.NATS_URL_LIVE;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: [NATS_URL!],
      },
    },
  );

  await app.listen();
  console.log('Product Service is running');
}
bootstrap();
