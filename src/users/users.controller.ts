import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/users')
export class UsersController {
    
    constructor(private usersService: UsersService) {}

    @ApiTags(`Users`)
    @Get()
    getUsers(): Promise<User[]> {   // es asincrono por eso utilizamos Promise
       return this.usersService.getUsers(); 
    }

    @ApiTags(`Users`)
    @Post()
    createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.createUser(user);
    }

    @ApiTags(`Users`)
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {   // ParseIntPipe hace la conversión para tener el id como number
       return this.usersService.getUser(id); 
    }

    @ApiTags(`Users`)
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
        return this.usersService.updateUser(id, user);
    }

    @ApiTags(`Users`)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

}
