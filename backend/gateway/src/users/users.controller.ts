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
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePatternMicroservices } from 'src/lib/MessagePatern.Microservices';

@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send(
      MessagePatternMicroservices.createUser,
      createUserDto,
    );
  }
  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    return this.natsClient.send(
      MessagePatternMicroservices.loginUser,
      LoginDto,
    );
  }

  @Get()
  findAll() {
    return this.natsClient.send(MessagePatternMicroservices.userFindAll, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.natsClient.send(MessagePatternMicroservices.userFindByID, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.natsClient.send(MessagePatternMicroservices.userUpdateByID, {
      id,
      updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.natsClient.send(MessagePatternMicroservices.userRemoveByID, id);
  }
}
