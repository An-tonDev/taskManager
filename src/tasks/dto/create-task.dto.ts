/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional,IsString,MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @MaxLength(60)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
