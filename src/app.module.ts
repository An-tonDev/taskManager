/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { prismaService } from './prisma/prisma.service'
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TasksModule, AuthModule, UsersModule],
  controllers: [AppController, UsersController],
  providers: [prismaService, UsersService],
})
export class AppModule {}
