/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import { AliasModule, Types as AliasTypes } from './alias.schema';

export const IndexModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    ...AliasModule.$defs
  }
};

export const Types = {
  ...AliasTypes
};
