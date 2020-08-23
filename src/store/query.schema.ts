/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import * as m from './query.model';

const FieldPathType: r.TypeInfo = {
  $id: 'FieldPath',
  $package: 'lib.standard.core',
  oneOf: [
    {
      type: 'string'
    },
    {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  ]
};

const FieldPath: r.Prototype<m.FieldPath> = {
  ref: { $ref: FieldPathType.$id!, $refPackage: FieldPathType.$package! },
  typeInfo: FieldPathType
};

const FilterOpType: r.TypeInfo = {
  $id: 'FilterOp',
  $package: 'lib.standard.core',
  oneOf: [
    {
      const: '<'
    },
    {
      const: '<='
    },
    {
      const: '=='
    },
    {
      const: '>='
    },
    {
      const: '>'
    },
    {
      const: 'array-contains'
    },
    {
      const: 'in'
    },
    {
      const: 'array-contains-any'
    }
  ]
};

const FilterOp: r.Prototype<m.FilterOp> = {
  ref: { $ref: FilterOpType.$id!, $refPackage: FilterOpType.$package! },
  typeInfo: FilterOpType
};

const ExpressionType: r.TypeInfo = {
  $id: 'Expression',
  $package: 'lib.standard.core',
  type: 'object',
  required: ['fieldPath', 'op', 'value'],
  properties: {
    fieldPath: {
      $ref: 'FieldPath',
      $refPackage: 'lib.standard.core'
    },
    op: {
      $ref: 'FilterOp',
      $refPackage: 'lib.standard.core'
    },
    value: {
      oneOf: [
        {
          type: 'string'
        },
        {
          type: 'boolean'
        },
        {
          type: 'number'
        }
      ]
    }
  }
};

const Expression: r.Prototype<m.Expression> = {
  ref: { $ref: ExpressionType.$id!, $refPackage: ExpressionType.$package! },
  typeInfo: ExpressionType
};

const QueryType: r.TypeInfo = {
  $id: 'Query',
  $package: 'lib.standard.core',
  type: 'object',
  required: ['name', 'source', 'columns', 'criteria'],
  properties: {
    name: {
      type: 'string'
    },
    icon: {
      type: 'string'
    },
    source: {
      $ref: 'ReferenceWithType',
      $refPackage: 'lib.core.reflection',
      $arguments: [
        {
          $ref: 'Collection',
          $refPackage: 'lib.standard.core'
        }
      ],
      $refArguments: 'lib.standard.core.Collection'
    },
    columns: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    criteria: {
      type: 'array',
      items: {
        $ref: 'Expression',
        $refPackage: 'lib.standard.core'
      }
    },
    collection: {
      $ref: 'ReferenceSet',
      $refPackage: 'lib.core.reflection'
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
    FieldPath: FieldPathType,
    FilterOp: FilterOpType,
    Expression: ExpressionType,
    Query: QueryType
  }
};

export const Types = {
  FieldPath,
  FilterOp,
  Expression,
  Query
};
