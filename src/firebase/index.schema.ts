/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import { ApplicationModule, Types as ApplicationTypes } from './application.schema';

export const IndexModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    ...ApplicationModule.$defs
  }
};

export const Types = {
  ...ApplicationTypes
};
