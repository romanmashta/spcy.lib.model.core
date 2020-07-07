import * as r from '@spcy/lib.core.reflection';
import * as m from './collection.model';

const PackageName = 'lib.model.core';

const ObjectStoreType: r.TypeInfo = {
  $id: 'ObjectStore',
  type: 'object',
  required: ['collections'],
  properties: {
    collections: {
      type: 'array',
      items: {
        $ref: 'Collection'
      }
    }
  }
};
const ObjectStore: r.Prototype<m.ObjectStore> = {
  id: ObjectStoreType.$id,
  package: PackageName,
  typeInfo: ObjectStoreType
};
const CollectionType: r.TypeInfo = {
  $id: 'Collection',
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string'
    },
    icon: {
      type: 'string'
    }
  }
};
const Collection: r.Prototype<m.Collection> = {
  id: CollectionType.$id,
  package: PackageName,
  typeInfo: CollectionType
};

export const CollectionModule: r.Module = {
  $id: PackageName,
  $defs: {
    ObjectStore: ObjectStoreType,
    Collection: CollectionType
  }
};

export const Types = {
  ObjectStore,
  Collection
};
