/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { prismaService } from 'prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
 constructor( private prisma:prismaService){}

  async getAllTasks(userId:string){
    return this.prisma.task.findMany({
      where:{userId},
      orderBy:{createdAt:'desc'}
    });
  }

  async getTaskByID(userId:string,id: string){
    const task = await this.prisma.task.findUnique({where:{id}});
    if (!task || task.userId !== userId)
      throw new NotFoundException(`Task with not found`);
    return task;
  }

  async createTask(userId:string, dto:CreateTaskDto) {
    return this.prisma.task.create({
  data:{
      title:dto.title,
      description: dto.description,
      userId
    }
  })  
    };
  

 async updateTask(userId: string, id: string, dto: UpdateTaskDto){
    const task = await this.prisma.task.findUnique({where:{id}})

    if(!task || task.userId !== userId){
      throw new NotFoundException('task not found')
    }

    return this.prisma.task.update({
      where:{id},
      data:{
        title: dto.title ?? task.title,
        description: dto.description ?? task.description,
        isCompleted: dto.isCompleted?? task.isCompleted
      }
    })
  }

  async deleteTask(userId:string,id: string){
    const task = await this.prisma.task.findUnique({where:{id}})
    if(!task || task.userId !== userId){
      throw new NotFoundException('task was not found')
    }
    await this.prisma.task.delete({where:{id}})
    return{success:true}
  }
}
