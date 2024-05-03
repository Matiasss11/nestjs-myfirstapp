import { Module } from '@nestjs/common';
import { TasksController } from "./tasks.contorller";
import { TasksService } from './tasks.service';

@Module({
    controllers: [TasksController],
    providers: [TasksService],
}) 
export class TasksModule {}