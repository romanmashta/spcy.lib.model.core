import { TypeInfo, Module, SchemaRepository } from '@spcy/lib.core.reflection';

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
    Collection: CollectionSchema
  }
};
