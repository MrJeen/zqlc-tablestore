import { Inject, Injectable } from '@nestjs/common';
import { TABLESTORE_OPTIONS } from './tablestore.constant';
import * as TableStore from 'tablestore';

@Injectable()
export class TableStoreService {
  private client: TableStore.Client;

  constructor(@Inject(TABLESTORE_OPTIONS) options: TableStore.ConfigOptions) {
    this.client = new TableStore.Client(options);
  }
}
