import { Controller, Get, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':email')
  findUser(@Param(email) email: string) {
    return this.userService.findUser(email);
  }

  @Delete(':email')
  deleteUser(@Param(email) email: string) {
    return this.userService.deleteUser(email);
  }
}
