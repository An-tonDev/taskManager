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



@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Req() req){
    const userId= req.userId
    return this.taskService.getAllTasks(userId);
  }

  @Get(':id')
  getTaskById(@Req() req, @Param('id',parseUUiDPipe) id: string){
    const userId='temp'
    return this.taskService.getTaskByID(userId,id);
  }

  @Post()
  createTask(@Req() req, @Body() dto: CreateTaskDto){
    const userId='temp'
    return this.taskService.createTask(userId,dto);
  }
    @Patch(':id')
  updateTask(@Req() req,@Param('id',parseUUiDPipe) id: string, @Body() dto:UpdateTaskDto){
    const userId='temp'
    return this.taskService.updateTask(userId,id,dto);
  }

  @Delete(':id')
  deleteTask( @Req() req,@Param('id') id: string){
    const userId='temp'
    return this.taskService.deleteTask(userId,id);
  }

}
