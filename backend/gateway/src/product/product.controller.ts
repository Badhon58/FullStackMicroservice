import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePatternMicroservices } from 'src/lib/MessagePatern.Microservices';

@Controller('product')
export class ProductController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.natsClient.send(MessagePatternMicroservices.createProduct, createProductDto);
  }

  @Get()
  findAll() {
    return this.natsClient.send(MessagePatternMicroservices.productFindAll, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.natsClient.send(MessagePatternMicroservices.productFindByID, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.natsClient.send(MessagePatternMicroservices.productUpdateByID, {
      id,
      updateProductDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.natsClient.send(MessagePatternMicroservices.productRemoveByID, id);
  }
}
