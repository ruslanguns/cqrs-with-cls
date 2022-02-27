import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { ClsStore } from 'nestjs-cls/dist/src/lib/cls.interfaces';

interface Storage extends ClsStore {
  demoData: string;
}

@Injectable()
export class StoreAndLogService {
  constructor(private readonly cls: ClsService<Storage>) {}

  log(message: string) {
    console.log(`<${this.cls.getId()}> ${message}`);
  }

  setData(something: string) {
    this.cls.set('demoData', something);
  }

  getData(key: symbol | 'demoData') {
    return this.cls.get(key);
  }
}
