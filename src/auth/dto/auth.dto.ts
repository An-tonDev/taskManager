/* eslint-disable prettier/prettier */
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class Signupdto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(7)
  password: string;
}

export class Logindto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
