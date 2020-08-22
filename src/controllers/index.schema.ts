/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import { CommonModule, Types as CommonTypes } from './common.schema';

export const IndexModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    ...CommonModule.$defs
  }
};

export const Types = {
  ...CommonTypes
};
