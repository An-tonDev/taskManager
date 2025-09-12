/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { parseUUiDPipe } from 'src/pipes/parse-uuid.pipe';
import * as authTypes from 'src/types/auth.types';



@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Req() req:authTypes.AuthenticatedRequest){
    const userId= req.user.id
    return this.taskService.getAllTasks(userId);
  }

  @Get(':id')
  getTaskById(@Req() req: authTypes.AuthenticatedRequest, @Param('id',parseUUiDPipe) id: string){
    const userId=req.user.id
    return this.taskService.getTaskByID(userId,id);
  }

  @Post()
  createTask(@Req() req:authTypes.AuthenticatedRequest, @Body() dto: CreateTaskDto){
    const userId=req.user.id
    return this.taskService.createTask(userId,dto);
  }
    @Patch(':id')
  updateTask(@Req() req: authTypes.AuthenticatedRequest,@Param('id',parseUUiDPipe) id: string, @Body() dto:UpdateTaskDto){
    const userId=req.user.id
    return this.taskService.updateTask(userId,id,dto);
  }

  @Delete(':id')
  deleteTask( @Req() req: authTypes.AuthenticatedRequest,@Param('id') id: string){
    const userId=req.user.id
    return this.taskService.deleteTask(userId,id);
  }

}
