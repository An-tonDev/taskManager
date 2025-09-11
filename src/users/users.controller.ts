/* eslint-disable prettier/prettier */
import { Controller, Get, Delete, Param,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParseEmailPipe } from 'src/pipes/parse-email.pipes';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':email')
  findUser(@Param('email',ParseEmailPipe) email: string) {
    return this.userService.findUser(email);
  }

  @Delete(':email')
  deleteUser(@Param('email',ParseEmailPipe) email: string) {
    return this.userService.deleteUser(email);
  }
}
