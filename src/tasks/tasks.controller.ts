/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Req,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';


@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Req() req){
    const userId='temp'
    return this.taskService.getAllTasks(userId);
  }

  @Get(':id')
  getTaskById(@Req() req, @Param(id) id: string){
    const userId='temp'
    return this.taskService.getTaskByID(userId,id);
  }

  @Post()
  createTask(@Req() req, @Body() dto: CreateTaskDto){
    const userId='temp'
    return this.taskService.createTask(userId,dto);
  }
    @Patch(':id')
  updateTask(
    @Param('id') id: string, @Body() UpdateTaskDto:UpdateTaskDto
  ): Task {
    const userId='temp'
    return this.taskService.updateTask(id, UpdateTaskDto.title, UpdateTaskDto.description, UpdateTaskDto.isCompleted);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    const userId='temp'
    return this.taskService.deleteTask(id);
  }

}
