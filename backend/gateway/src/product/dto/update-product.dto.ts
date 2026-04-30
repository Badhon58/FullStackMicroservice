import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({
        example: 'Bag',
        description: 'Unique product name',
        minLength: 3,
        maxLength: 30,
      })
      @IsString()
      @IsNotEmpty()
      @MinLength(3)
      @MaxLength(30)
      productName!: string;
    
      @ApiProperty({
        example: 'Bag 5 inch',
        description: 'Display name of product',
        minLength: 2,
        maxLength: 50,
      })
      @IsString()
      @IsNotEmpty()
      @MinLength(2)
      @MaxLength(50)
      productDisplayName!: string;
    
      @ApiProperty({
        example: 1000,
        description: 'Price of the product',
      })
      @Type(() => Number)
      @IsNumber()
      price!: number;
    
      @ApiProperty({
        example: 'High quality leather bag',
      })
      @IsString()
      @IsNotEmpty()
      description!: string;
    
      @ApiProperty({
        example: 'Bags',
      })
      @IsString()
      @IsNotEmpty()
      category!: string;
    
      @ApiProperty({
        example: 'BrandX',
      })
      @IsString()
      brand!: string;
    
      @ApiProperty({
        example: 50,
        description: 'Available stock quantity',
      })
      @Type(() => Number)
      @IsNumber()
      stock!: number;
    
    
      @ApiProperty({
        example: true,
        description: 'Is product active or not',
      })
      @IsBoolean()
      isActive!: boolean;
    
      @ApiProperty({
        example: 10,
        description: 'Discount percentage',
        required: false,
      })
      @IsOptional()
      @Type(() => Number)
      @IsNumber()
      discount?: number;
    
      @ApiProperty({
        example: 4.5,
        description: 'Product rating',
        required: false,
      })
      @IsOptional()
      @Type(() => Number)
      @IsNumber()
      rating?: number;
}
