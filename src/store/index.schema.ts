import { Module } from '@spcy/lib.core.reflection';
import { CollectionSchema } from './collection.schema';
import { QuerySchema } from './query.schema';

export const IndexSchema: Module = {
  $id: '@spcy/lib.model.core',
  $defs: {
    ...CollectionSchema.$defs,
    ...QuerySchema.$defs
  }
};
