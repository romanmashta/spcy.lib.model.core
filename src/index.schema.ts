/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import {
  IndexModule as ControllersIndexSchemaModule,
  Types as ControllersIndexSchemaTypes
} from './controllers/index.schema';
import { IndexModule as StoreIndexSchemaModule, Types as StoreIndexSchemaTypes } from './store/index.schema';
import { IndexModule as FirebaseIndexSchemaModule, Types as FirebaseIndexSchemaTypes } from './firebase/index.schema';
import { IndexModule as UserIndexSchemaModule, Types as UserIndexSchemaTypes } from './user/index.schema';

export const IndexModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    ...ControllersIndexSchemaModule.$defs,
    ...StoreIndexSchemaModule.$defs,
    ...FirebaseIndexSchemaModule.$defs,
    ...UserIndexSchemaModule.$defs
  }
};

export const Types = {
  ...ControllersIndexSchemaTypes,
  ...StoreIndexSchemaTypes,
  ...FirebaseIndexSchemaTypes,
  ...UserIndexSchemaTypes
};
