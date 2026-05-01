import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
