import * as r from '@spcy/lib.core.reflection';
import { CollectionModule, Types as CollectionTypes } from './collection.schema';
import { QueryModule, Types as QueryTypes } from './query.schema';

const PackageName = 'lib.model.core';

export const IndexModule: r.Module = {
  $id: PackageName,
  $defs: {
    ...CollectionModule.$defs,
    ...QueryModule.$defs
  }
};

export const Types = {
  ...CollectionTypes,
  ...QueryTypes
};
