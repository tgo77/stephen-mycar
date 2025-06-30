import { Body, Controller } from '@nestjs/common';
import { Post, Get, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {


    @Post("/signup")
    createUser(@Body() user: CreateUserDto ){
        console.log(user);
        
    }
    

}
