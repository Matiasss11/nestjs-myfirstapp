import { Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express";
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller()
export class HelloController {

    @Get('/hello')
    // Aplicando sintaxis de express
    index(@Req() request: Request, @Res() response: Response) {
        response.status(200).json({
            message: 'Hello world',
        });
    }

    @Get('new')
    @HttpCode(201)
    somethingNew(){
        return 'something new'; 
    }

    @Get('notfound')
    @HttpCode(404)
    notfoundPage(){
        return '404 not found';
    }

    @Get('errorPage')
    @HttpCode(500)
    errorPage(){
        return '500 error route';
    }

    @Get('ticket/:num')
    getNumber(@Param('num', ParseIntPipe) num: number){
        return num + 14;
    }

    @Get('active/:status')
    @UseGuards(AuthGuard)
    isUserActive(@Param('status', ParseBoolPipe) status: boolean){
        console.log(typeof status);
        return status; 
    }

    @Get('/greet')
    @UseGuards(AuthGuard)
    greet(@Query(ValidateuserPipe) query: {name: string, age: number}){
        console.log(typeof query.name);
        console.log(typeof query.age);
        return `Hello ${query.name}, you are ${query.age} years old`; 
    }
}
