/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: prismaService) {}

  async findUser(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async deleteUser(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await this.prisma.user.delete({ where: { email } });
  }
}
