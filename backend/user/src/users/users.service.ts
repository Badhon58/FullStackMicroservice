import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;
      const normalizedEmail = email.toLowerCase().trim();
      const existingUser = await this.userModel.findOne({
        email: normalizedEmail,
      });
      if (existingUser) {
        return {
          message: 'User Already Exists',
          success: false,
        };
      }
      const user = new this.userModel({
        ...createUserDto,
        email: normalizedEmail,
      });
      const data = await user.save();
      const userObj = data.toObject();
      return {
        message: 'User Creation Successful',
        data: userObj,
        success: true,
      };
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }

      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login(loginDto: LoginDto) {
    const { phone, password } = loginDto;

    // find user
    const user = await this.userModel.findOne({ phone });

    if (!user) {
      return {
        message: 'User not found',
        success: false,
      };
    }

    // check password (example)
    const isMatch = user.password === password;

    if (!isMatch) {
      return {
        message: 'Invalid credentials',
        success: false,
      };
    }

    return {
      message: 'Login successful',
      data: user,
      success: true,
    };
  }

  async findAll() {
    try {
      let data = await this.userModel.find();
      return {
        message: `All Users`,
        data: data,
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return {
          message: 'User Not Found',
          success: false,
        };
      }
      return {
        message: 'User Found',
        data: user,
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      if (!user) {
        return {
          message: 'User Not Found',
          success: false,
        };
      }
      return {
        message: 'User Update Successful',
        data: user,
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      return {
        message: 'User Not Found',
        success: false,
      };
    }
    return { message: 'User deleted successfully' };
  }
}
