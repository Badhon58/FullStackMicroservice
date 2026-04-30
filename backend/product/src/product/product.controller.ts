import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatternMicroservices } from 'src/lib/MessagePatern.Microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @MessagePattern(MessagePatternMicroservices.createProduct)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @MessagePattern(MessagePatternMicroservices.productFindAll)
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern(MessagePatternMicroservices.productFindByID)
  findOne(@Payload() id: string) {
    return this.productService.findOne(+id);
  }

  @MessagePattern(MessagePatternMicroservices.productFindByID)
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern(MessagePatternMicroservices.productRemoveByID)
  remove(@Payload() id: string) {
    return this.productService.remove(+id);
  }
}
