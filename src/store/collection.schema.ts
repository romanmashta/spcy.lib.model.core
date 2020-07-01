import { TypeInfo, Module, SchemaRepository } from '@spcy/lib.core.reflection';

export const ObjectStoreSchema: TypeInfo = {
  $id: '#/$defs/ObjectStore',
  type: 'object',
  required: ['collections'],
  properties: {
    collections: {
      type: 'array',
      items: {
        $ref: '#/$defs/Collection'
      }
    }
  }
};

SchemaRepository.register(ObjectStoreSchema);
export const CollectionSchema: TypeInfo = {
  $id: '#/$defs/Collection',
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
      $ref: '#/$defs/TypeInfo'
    }
  }
};

SchemaRepository.register(CollectionSchema);

export const MetaSchema: Module = {
  $defs: {
    ObjectStore: ObjectStoreSchema,
    Collection: CollectionSchema
  }
};
