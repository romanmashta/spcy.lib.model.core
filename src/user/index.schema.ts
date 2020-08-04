/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import { UserModule, Types as UserTypes } from './user.schema';

export const IndexModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    ...UserModule.$defs
  }
};

export const Types = {
  ...UserTypes
};
