/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import { AppBoxModule, Types as AppBoxTypes } from './app-box.schema';

export const IndexModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    ...AppBoxModule.$defs
  }
};

export const Types = {
  ...AppBoxTypes
};
