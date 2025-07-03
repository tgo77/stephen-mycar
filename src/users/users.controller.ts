import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { Post, Get, Patch, Delete } from '@nestjs/common';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { Serialize } from 'src/interceptors/serialize.interceptor';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {
    console.log('====================================');
    console.log(this.authService);
    console.log('====================================');
  }

  @Post('/signup')
  createUser(@Body() user: CreateUserDto) {
    console.log(user);
    return this.usersService.create(user.email, user.password);
  }

  //   @UseInterceptors(new SerializeInterceptor(UserDto))
  //   @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException(`${id} user not found`);
    }
    return user;
  }

  //   @Serialize(UserDto)
  @Get('/')
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException(``);
    }
    return this.usersService.update(parseInt(id), user);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException(``);
    }
    return this.usersService.remove(parseInt(id));
  }
}
