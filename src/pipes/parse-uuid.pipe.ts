/* eslint-disable prettier/prettier */
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { IsUUID } from 'class-validator';

@Injectable()
export class parseUUiDPipe implements PipeTransform {
  transform(value: any) {
    if (!IsUUID(value)) {
      throw new BadRequestException(`Invalid ID format: ${value}`);
    }
    return value;
  }
}
