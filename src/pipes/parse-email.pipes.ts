/* eslint-disable prettier/prettier */
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class ParseEmailPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value !== 'string') {
      throw new BadRequestException('Email must be a string');
    }

    const cleanEmail = value.trim().toLowerCase();
    if (!isEmail(cleanEmail)) {
      throw new BadRequestException(`Invalid email: ${value}`);
    }
    return cleanEmail;
  }
}
