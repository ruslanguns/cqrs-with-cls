import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { ClsStore } from 'nestjs-cls/dist/src/lib/cls.interfaces';

interface Storage extends ClsStore {
  demoData: string;
}

@Injectable()
export class StoreAndLogService implements OnModuleInit {
  constructor(private readonly cls: ClsService<Storage>) {}

  onModuleInit() {
    this.initialData('Hello World!');
  }

  log(message: string) {
    console.log(`<${this.cls.getId()}> ${message}`);
  }

  initialData(something: string) {
    this.cls.set('demoData', something);
  }
}
