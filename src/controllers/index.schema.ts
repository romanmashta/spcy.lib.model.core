import * as r from '@spcy/lib.core.reflection';
import { CommonModule, Types as CommonTypes } from './common.schema';

export const IndexModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    ...CommonModule.$defs
  }
};

export const Types = {
  ...CommonTypes
};
