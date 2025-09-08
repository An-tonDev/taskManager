/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { prismaService } from './prisma/prisma.service'
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, AuthModule],
  controllers: [AppController],
  providers: [prismaService],
})
export class AppModule {}
