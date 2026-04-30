import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: any) {
    try {
      const existing = await this.productModel.findOne({
        productName: createProductDto.productName,
      });

      if (existing) {
        return {
          statusCode: 409,
          message: 'Product already exists',
          success: false,
        };
      }

      const product = new this.productModel(createProductDto);
      const data = await product.save();

      return {
        statusCode: 201,
        message: 'Product created successfully',
        data,
      };
    } catch (error: any) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.find();
      return {
        success: true,
        message: 'Products fetched successfully',
        data: products,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id);

      if (!product) {
        return {
          statusCode: 404,
          message: 'Product not found',
          success: false,
        };
      }

      return {
        statusCode: 200,
        message: 'Product fetched successfully',
        success: true,
        data: product,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        success: false,
      };
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDto,
        {
          new: true,
        },
      );

      if (!product) {
        return {
          statusCode: 404,
          success: false,
          message: 'Product not found',
        };
      }

      return {
        statusCode: 200,
        success: true,
        message: 'Product updated successfully',
        data: product,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        message: 'Internal server error',
      };
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productModel.findByIdAndDelete(id);
      if (!product) {
        return {
          statusCode: 404,
          message: 'Product not found',
          success: true,
        };
      }
      return {
        statusCode: 200,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
