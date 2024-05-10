import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { Profile } from './profile.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { DataSource } from 'typeorm';

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
    createUser(@Body() user: CreateUserDto) /*: Promise<User> */ {
        return this.usersService.createUser(user);
    }

    @ApiTags(`Users`)
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number)/*: : Promise<User> */ {   // ParseIntPipe hace la conversión para tener el id como number
       return this.usersService.getUser(id); 
    }

    @ApiTags(`Users`)
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
        console.log("user: ", user); 
        console.log("id: ", id)
        return this.usersService.updateUser(id, user);
    }

    @ApiTags(`Users`)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

    @Post(':id/profile')
    createProfile (@Param('id', ParseIntPipe) id: number, @Body() profile: CreateProfileDto) {
        console.log("profile: ", profile); 
        console.log("id: ", id); 
        
        return this.usersService.createProfile(id, profile);
    }
}
