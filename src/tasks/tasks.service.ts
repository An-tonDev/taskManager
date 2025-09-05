/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskByID(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task)
      throw new NotFoundException(`Task with this ID "${id}"  not found`);
    return task;
  }

  createTask(title: string, description?: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      isCompleted: false,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(
    id: string,
    title?: string,
    description?: string,
    isCompleted?: boolean,
  ): Task {
    const task = this.getTaskByID(id);
    if (title) task.title = title;
    if (description) task.description = description;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;
    return task
  }

  deleteTask(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1)
      throw new NotFoundException(`task with this ID ${id} not found`);
    this.tasks.splice(index, 1);
  }
}
