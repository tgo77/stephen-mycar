import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Query,
  Session,
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

  @Get('/whoami')
  whoami(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }

  @Post('/signup')
  async createUser(@Body() createDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      createDto.email,
      createDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() createDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(
      createDto.email,
      createDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
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
