import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { NatsClientModule } from 'src/nats-client/nats-client-module';

@Module({
  imports: [NatsClientModule],
  controllers: [ProductController],
  providers: [],
})
export class ProductModule {}
