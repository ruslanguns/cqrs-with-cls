import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class StoreAndLogService {
  constructor(private readonly cls: ClsService) {}

  log(message: string) {
    console.log(`<${this.cls.getId()}> ${message}`);
  }
}
