/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import {
  IndexModule as ControllersIndexSchemaModule,
  Types as ControllersIndexSchemaTypes
} from './controllers/index.schema';
import { IndexModule as StoreIndexSchemaModule, Types as StoreIndexSchemaTypes } from './store/index.schema';
import { IndexModule as FirebaseIndexSchemaModule, Types as FirebaseIndexSchemaTypes } from './firebase/index.schema';
import { IndexModule as UserIndexSchemaModule, Types as UserIndexSchemaTypes } from './user/index.schema';
import {
  IndexModule as NavigationIndexSchemaModule,
  Types as NavigationIndexSchemaTypes
} from './navigation/index.schema';

export const IndexModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    ...ControllersIndexSchemaModule.$defs,
    ...StoreIndexSchemaModule.$defs,
    ...FirebaseIndexSchemaModule.$defs,
    ...UserIndexSchemaModule.$defs,
    ...NavigationIndexSchemaModule.$defs
  }
};

export const Types = {
  ...ControllersIndexSchemaTypes,
  ...StoreIndexSchemaTypes,
  ...FirebaseIndexSchemaTypes,
  ...UserIndexSchemaTypes,
  ...NavigationIndexSchemaTypes
};
