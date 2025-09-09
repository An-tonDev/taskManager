/* eslint-disable prettier/prettier */
import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logindto, Signupdto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  signup(@Body() dto:Signupdto ) {
    return this.authservice.signup(dto.email, dto.password);
  }
  @Post('login')
  login(@Body() dto: Logindto) {
    return this.authservice.login(dto.email, dto.password);
  }
}
