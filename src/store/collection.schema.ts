import { TypeInfo, Module } from '@spcy/lib.core.reflection';

const ObjectStore: TypeInfo = {
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

const Collection: TypeInfo = {
  $id: 'Collection',
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
      $ref: 'TypeInfo'
    }
  }
};

export const CollectionSchema: Module = {
  $id: '@spcy/lib.model.core',
  $defs: {
    ObjectStore,
    Collection
  }
};
