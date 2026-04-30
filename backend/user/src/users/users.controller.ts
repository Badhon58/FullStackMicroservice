import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePatternMicroservices } from 'src/lib/MessagePatern.Microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(MessagePatternMicroservices.createUser)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern(MessagePatternMicroservices.userFindAll)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(MessagePatternMicroservices.userFindByID)
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern(MessagePatternMicroservices.userUpdateByID)
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern(MessagePatternMicroservices.userRemoveByID)
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }
}
