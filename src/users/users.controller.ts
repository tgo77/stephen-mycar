import { BadRequestException, Body, Controller, NotFoundException, Param, Query } from '@nestjs/common';
import { Post, Get, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService){
        console.log(this.usersService);
        
    }


    @Post("/signup")
    createUser(@Body() user: CreateUserDto ){
        console.log(user);
        return this.usersService.create(user.email, user.password);
        
    }

    @Get("/:id")
    async findUser(@Param("id") id:string){
        const user = await this.usersService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException(`${id} user not found`);
        }
        return user;
    }

    @Get("/")
    findAllUsers(@Query("email") email:string){
        return this.usersService.find(email);
    }

    @Patch("/:id")
    updateUser(@Param("id") id:string, @Body() user : UpdateUserDto){
        if(!id){
            throw new BadRequestException(``);
        }
        return this.usersService.update(parseInt(id), user);
    }

    @Delete("/:id")
    removeUser(@Param("id") id:string){
        if(!id){
            throw new BadRequestException(``);
        }
        return this.usersService.remove(parseInt(id));
    }


    

}
