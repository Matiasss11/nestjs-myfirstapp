import { Injectable, HttpCode, NotFoundException } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

export interface User {
    name: string;
    age: number;
}

@Injectable({})
export class TasksService {
    private tasks = []

    getTasks() {
        return this.tasks;
    }

    getTask(id: number) {
        const taskFound = this.tasks.find(task => task.id === id);
        if (!taskFound) {
            return new NotFoundException('Task not found');
        }

        return taskFound;
    }

    createTasks(task: CreateTaskDto) {
        this.tasks.push({
            ...task,
            id: this.tasks.length + 1,
        });
        return task;
    }

    updateTasks(task: UpdateTaskDto) {
        return 'Actualizando Tareas';
    }

    deleteTasks() {
        return 'Eliminando Tareas';
    }

    patchTasks(task: UpdateTaskDto) {
        return 'Actualizando parcialmente Tareas';
    }
}