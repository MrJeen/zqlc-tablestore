import { Inject, Injectable } from '@nestjs/common';
import { TABLESTORE_OPTIONS } from './tablestore.constant';
import * as TableStore from 'tablestore';
import { Int64LE } from 'int64-buffer';

@Injectable()
export class TableStoreService {
  public client: TableStore.Client;

  constructor(@Inject(TABLESTORE_OPTIONS) options: TableStore.ConfigOptions) {
    this.client = new TableStore.Client(options);
  }

  async search(options: any) {
    const data = (await this.client.search(options)) as any;
    return this.format(data.rows);
  }

  format(data: any[]) {
    const result = [];
    for (const item of data) {
      const object = {} as any;
      item.primaryKey.forEach((val: any) => {
        object[val.name] = this.transform(val.value);
      });
      item.attributes.forEach((val: any) => {
        object[val.columnName] = this.transform(val.columnValue);
      });
      result.push(object);
    }
    return result;
  }

  transform(value: any) {
    if (value instanceof Int64LE) {
      value = value.toNumber();
    }
    return value;
  }
}
