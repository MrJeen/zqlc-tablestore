import { DynamicModule, Module } from '@nestjs/common';
import {
  TableStoreModuleAsyncOptions,
  TableStoreModuleOptions,
} from './tablestore.interface';
import {
  createAsyncOptionsProvider,
  createOptionsProvider,
} from './tablestore.provider';
import { TableStoreService } from './tablestore.service';

@Module({})
export class RedisModule {
  static forRoot(options: TableStoreModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      global: options.isGlobal,
      providers: [createOptionsProvider(options)],
      exports: [TableStoreService],
    };
  }

  static forRootAsync(options: TableStoreModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      global: options.isGlobal,
      imports: options.imports,
      providers: [createAsyncOptionsProvider(options)],
      exports: [TableStoreService],
    };
  }
}
