/* eslint-disable prettier/prettier */
import { IsOptional, IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
