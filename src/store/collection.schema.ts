import * as r from '@spcy/lib.core.reflection';
import * as m from './collection.model';

const ObjectStoreType: r.TypeInfo = {
  $id: 'ObjectStore',
  $package: 'lib.model.core',
  type: 'object',
  required: ['collections'],
  properties: {
    collections: {
      type: 'array',
      items: {
        $ref: 'Collection',
        $refPackage: 'lib.model.core'
      }
    }
  }
};

const ObjectStore: r.Prototype<m.ObjectStore> = {
  $ref: ObjectStoreType.$id!,
  $refPackage: ObjectStoreType.$package!,
  typeInfo: ObjectStoreType
};

const CollectionType: r.TypeInfo = {
  $id: 'Collection',
  $package: 'lib.model.core',
  type: 'object',
  required: ['name', 'type'],
  properties: {
    name: {
      type: 'string'
    },
    icon: {
      type: 'string'
    },
    type: {
      $ref: 'TypeInfo',
      $refPackage: 'lib.core.reflection'
    }
  }
};

const Collection: r.Prototype<m.Collection> = {
  $ref: CollectionType.$id!,
  $refPackage: CollectionType.$package!,
  typeInfo: CollectionType
};

export const CollectionModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    ObjectStore: ObjectStoreType,
    Collection: CollectionType
  }
};

export const Types = {
  ObjectStore,
  Collection
};
