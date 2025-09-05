/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param(id) id: string): Task {
    return this.taskService.getTaskByID(id);
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.taskService.createTask(title, description);
  }
    @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('description') description?: string,
    @Body('isCompleted') isCompleted?: boolean,
  ): Task {
    return this.taskService.updateTask(id, title, description, isCompleted);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }

}
