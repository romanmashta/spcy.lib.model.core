/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import * as m from './query.model';

const StatementType: r.TypeInfo = {
  $id: 'Statement',
  $package: 'lib.standard.core',
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
        $ref: 'Statement',
        $refPackage: 'lib.standard.core'
      }
    }
  ]
};

const Statement: r.Prototype<m.Statement> = {
  ref: { $ref: StatementType.$id!, $refPackage: StatementType.$package! },
  typeInfo: StatementType
};

const QueryType: r.TypeInfo = {
  $id: 'Query',
  $package: 'lib.standard.core',
  type: 'object',
  required: ['collection'],
  properties: {
    collection: {
      type: 'string'
    },
    criteria: {
      type: 'array',
      items: {
        $ref: 'Statement',
        $refPackage: 'lib.standard.core'
      }
    }
  }
};

const Query: r.Prototype<m.Query> = {
  ref: { $ref: QueryType.$id!, $refPackage: QueryType.$package! },
  typeInfo: QueryType
};

export const QueryModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    Statement: StatementType,
    Query: QueryType
  }
};

export const Types = {
  Statement,
  Query
};
