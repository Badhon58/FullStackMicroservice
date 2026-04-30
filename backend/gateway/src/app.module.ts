import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NatsClientModule } from './nats-client/nats-client-module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
