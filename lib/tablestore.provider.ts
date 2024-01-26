import { Provider, ValueProvider } from '@nestjs/common';
import {
  TableStoreModuleAsyncOptions,
  TableStoreModuleOptions,
} from './tablestore.interface';
import { TABLESTORE_OPTIONS } from './tablestore.constant';

export const createOptionsProvider = (
  options: TableStoreModuleOptions,
): ValueProvider<TableStoreModuleOptions> => ({
  provide: TABLESTORE_OPTIONS,
  useValue: options,
});

export const createAsyncOptionsProvider = (
  options: TableStoreModuleAsyncOptions,
): Provider => {
  return {
    provide: TABLESTORE_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject,
  };
};
