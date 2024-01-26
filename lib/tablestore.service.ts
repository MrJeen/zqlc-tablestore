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

  /**
   * 使用token翻页示例（异步）。
   */
  async scrollSearch(params: any): Promise<any> {
    let data = (await this.client.search(params)) as any;
    const results = [];
    if (data.rows.length) {
      results.push(...this.format(data.rows));
      while (data.nextToken && data.nextToken.length) {
        //当存在nextToken时，表示还有未读取的数据。
        //token持久化。
        //1）nextToken为buffer，需转换为base64字符串后做持久化。
        //2）持久化的base64字符串，可转换为buffer作为参数重新使用。
        const nextToken = data.nextToken.toString('base64');
        const token = Buffer.from(nextToken, 'base64');

        params.searchQuery.token = token; //翻页更新token值。

        //设置了token不能再设置Sort。另外使用token后不能设置offset
        delete params.searchQuery.sort, params.searchQuery.offset;

        data = await this.client.search(params);
        results.push(...this.format(data.rows));
      }
    }
    return results;
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
