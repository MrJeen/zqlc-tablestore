import { ModuleMetadata } from '@nestjs/common';
import * as TableStore from 'tablestore';

export interface TableStoreModuleOptions extends TableStore.ConfigOptions {
  isGlobal?: boolean;
}

export interface TableStoreModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useFactory: (
    ...args: any[]
  ) => Promise<TableStore.ConfigOptions> | TableStore.ConfigOptions;
  inject?: any[];
}
