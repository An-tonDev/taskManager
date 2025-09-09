/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const olduser=await this.prisma.user.findUnique({where :{email}})

    if(olduser){
        throw new ConflictException('Email is in use already')
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({ data: { email, password: hash } });

    const token= await this.jwt.signAsync({ sub:user.id, email:user.email})

    return {
        access_token:token,
        user:{
            id:user.id,
            email:user.email
        }
    };
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
