import { TypeInfo, Module, SchemaRepository } from '@spcy/lib.core.reflection';

export const StatementSchema: TypeInfo = {
  $id: '#/$defs/Statement',
  oneOf: [
    {
      type: 'string'
    },
    {
      type: 'number'
    },
    {
      type: 'boolean'
    },
    {
      type: 'null'
    },
    {
      type: 'array',
      items: {
        $ref: '#/$defs/Statement'
      }
    }
  ]
};

SchemaRepository.register(StatementSchema);
export const QuerySchema: TypeInfo = {
  $id: '#/$defs/Query',
  type: 'object',
  required: ['collection'],
  properties: {
    collection: {
      type: 'string'
    },
    criteria: {
      type: 'array',
      items: {
        $ref: '#/$defs/Statement'
      }
    }
  }
};

SchemaRepository.register(QuerySchema);

export const MetaSchema: Module = {
  $defs: {
    Statement: StatementSchema,
    Query: QuerySchema
  }
};
