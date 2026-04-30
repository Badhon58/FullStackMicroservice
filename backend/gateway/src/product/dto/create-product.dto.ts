import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Bag',
    description: 'Unique Bag For the User',
    minLength: 3,
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  productName: string;

  @ApiProperty({
    example: 'Bag 5 inch',
    description: 'Display product',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  productdisplayName: string;

  @ApiProperty({
    example: '1000',
    description: 'price of that product',
  })
  @IsNotEmpty()
  price: string;
}
