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

@Module({
  providers: [TableStoreService],
  exports: [TableStoreService],
})
export class TableStoreModule {
  static forRoot(options: TableStoreModuleOptions): DynamicModule {
    return {
      module: TableStoreModule,
      global: options.isGlobal,
      providers: [createOptionsProvider(options)],
      exports: [TableStoreService],
    };
  }

  static forRootAsync(options: TableStoreModuleAsyncOptions): DynamicModule {
    return {
      module: TableStoreModule,
      global: options.isGlobal,
      imports: options.imports,
      providers: [createAsyncOptionsProvider(options)],
      exports: [TableStoreService],
    };
  }
}
