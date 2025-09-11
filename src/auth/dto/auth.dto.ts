/* eslint-disable prettier/prettier */
import { IsEmail, MinLength, IsNotEmpty,Matches } from 'class-validator';

export class Signupdto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(7)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,{
    message:'Password must contain at least one uppercase letter,lowercase letter and a number'
  })
  password: string;
}

export class Logindto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
