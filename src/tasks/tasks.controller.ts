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
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';


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
  createTask(@Body() CreateTaskDto: CreateTaskDto) : Task {
    return this.taskService.createTask(CreateTaskDto.title,CreateTaskDto.description);
  }
    @Patch(':id')
  updateTask(
    @Param('id') id: string, @Body() UpdateTaskDto:UpdateTaskDto
  ): Task {
    return this.taskService.updateTask(id, UpdateTaskDto.title, UpdateTaskDto.description, UpdateTaskDto.isCompleted);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }

}
