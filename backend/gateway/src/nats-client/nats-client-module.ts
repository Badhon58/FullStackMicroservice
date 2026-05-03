import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

const env = process.env.ENVIRONMENT;

const NATS_URL =
  env === 'LOCAL' ? process.env.NATS_URL_LOCAL : process.env.NATS_URL_LIVE;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [NATS_URL!],
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class NatsClientModule {}
