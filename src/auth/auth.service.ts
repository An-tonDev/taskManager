import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { prismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: prismaService,
    private jwt: JwtService,
  ) {}

  async signup(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = this.prisma.user.create({ data: { email, password: hash } });
    return user;
  }

  async login(email: string, password: string) {
    const user = this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('invalid login credentials');
    }
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });

    return { access_token: token };
  }
}
