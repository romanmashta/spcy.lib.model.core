import * as r from '@spcy/lib.core.reflection';
import { IndexModule as StoreModule, Types as StoreTypes } from './store';

export const IndexModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    ...StoreModule.$defs
  }
};

export const Types = {
  ...StoreTypes
};
