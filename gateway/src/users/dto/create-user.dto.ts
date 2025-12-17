import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'BadhonBiswas',
    description: 'Unique username of the user',
    minLength: 3,
    maxLength: 30,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  userName: string;

  @ApiProperty({
    example: 'Badhon Biswas',
    description: 'Display name of the user',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  displayName: string;

  @ApiProperty({
    example: 'badhon@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
