import { Module } from '@spcy/lib.core.reflection';
import { IndexSchema as StoreSchema } from './store';

export const IndexSchema: Module = {
  $id: '@spcy/lib.model.core',
  $defs: {
    ...StoreSchema.$defs
  }
};
