import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('/tasks')
@ApiTags(`Tasks`)
export class TasksController {
    
    tasksService: TasksService;

    constructor(tasksService: TasksService) {
        this.tasksService = tasksService;
    }
    

    @Get()
    @ApiOperation({ summary: "Get all tasks" })
    @ApiResponse({ status: 200, description: "Return all tasks" })
    @ApiResponse({ status: 403, description: "Forbidden" })
    getAllTasks(@Query() query: any) {
        console.log(query);
        
        return this.tasksService.getTasks();
    }

    @Get('/:id')
    getTask(@Param('id') id: string) {
        return this.tasksService.getTask(parseInt(id));
    }

    @Post()
    @ApiOperation({ summary: "Create task" })
    createTasks(@Body() task: CreateTaskDto) {       
        return this.tasksService.createTasks(task);
    }

    @Put()
    updateTasks(@Body() task: UpdateTaskDto) {
        return this.tasksService.updateTasks(task);
    }

    @Delete()
    deleteTasks() {
        return this.tasksService.deleteTasks();
    }

    @Patch()
    patchTasks(@Body() task: UpdateTaskDto) {
        return this.tasksService.patchTasks(task);
    }

}