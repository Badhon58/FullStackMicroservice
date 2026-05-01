import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'badhon123' })
  @IsString()
  @IsNotEmpty()
  userName!: string;

  @ApiProperty({ example: 'Badhon Biswas' })
  @IsString()
  displayName!: string;

  @ApiProperty({ example: 'badhon@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password!: string;

  @ApiProperty({ example: '017XXXXXXXX' })
  @IsString()
  phone!: string;

  @ApiProperty({ example: '25' })
  @IsString()
  age!: string;

  @ApiProperty({ example: 'Male' })
  @IsString()
  gender!: string;

  @ApiProperty({ example: 'Dhaka, Bangladesh' })
  @IsString()
  address!: string;

  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  role!: string;
}

export class LoginDto {
  @ApiProperty({ example: '01XXXXXXXXX' })
  @IsString()
  @IsNotEmpty()
  phone!: string;
  @ApiProperty({ example: 'test123#' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
