import { TypeInfo, Module } from '@spcy/lib.core.reflection';

const Statement: TypeInfo = {
  $id: 'Statement',
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
        $ref: 'Statement'
      }
    }
  ]
};

const Query: TypeInfo = {
  $id: 'Query',
  type: 'object',
  required: ['collection'],
  properties: {
    collection: {
      type: 'string'
    },
    criteria: {
      type: 'array',
      items: {
        $ref: 'Statement'
      }
    }
  }
};

export const QuerySchema: Module = {
  $id: '@spcy/lib.model.core',
  $defs: {
    Statement,
    Query
  }
};
