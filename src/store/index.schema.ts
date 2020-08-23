/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import { CollectionModule, Types as CollectionTypes } from './collection.schema';
import { CollectionViewModule, Types as CollectionViewTypes } from './collection-view.schema';
import { QueryModule, Types as QueryTypes } from './query.schema';

export const IndexModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    ...CollectionModule.$defs,
    ...CollectionViewModule.$defs,
    ...QueryModule.$defs
  }
};

export const Types = {
  ...CollectionTypes,
  ...CollectionViewTypes,
  ...QueryTypes
};
