import * as r from '@spcy/lib.core.reflection';
import { AppBoxModule, Types as AppBoxTypes } from './app-box.schema';

export const IndexModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    ...AppBoxModule.$defs
  }
};

export const Types = {
  ...AppBoxTypes
};
