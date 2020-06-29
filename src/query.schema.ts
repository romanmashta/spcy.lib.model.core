import { TypeInfo, Module, SchemaRepository } from '@spcy/lib.core.reflection';

export const StatementSchema: TypeInfo = {
  $id: '#/$defs/Statement',
  oneOf: [
    {
      $ref: '#/$defs/StringType'
    },
    {
      $ref: '#/$defs/NumberType'
    },
    {
      $ref: '#/$defs/BooleanType'
    },
    {
      $ref: '#/$defs/NullType'
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
export const QueryModelSchema: TypeInfo = {
  $id: '#/$defs/QueryModel',
  type: 'object',
  required: ['collection', 'columns', 'criteria'],
  properties: {
    collection: {
      type: 'string'
    },
    columns: {
      $ref: '#/$defs/TypeInfo'
    },
    criteria: {
      type: 'array',
      items: {
        $ref: '#/$defs/Statement'
      }
    }
  }
};

SchemaRepository.register(QueryModelSchema);

export const MetaSchema: Module = {
  $defs: {
    Statement: StatementSchema,
    QueryModel: QueryModelSchema
  }
};
