import * as r from '@spcy/lib.core.reflection';
import * as m from './query.model';

const PackageName = 'lib.model.core';

const StatementType: r.TypeInfo = {
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
const Statement: r.Prototype<m.Statement> = {
  id: StatementType.$id,
  package: PackageName,
  typeInfo: StatementType
};
const QueryType: r.TypeInfo = {
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
const Query: r.Prototype<m.Query> = {
  id: QueryType.$id,
  package: PackageName,
  typeInfo: QueryType
};

export const QueryModule: r.Module = {
  $id: PackageName,
  $defs: {
    Statement: StatementType,
    Query: QueryType
  }
};

export const Types = {
  Statement,
  Query
};
