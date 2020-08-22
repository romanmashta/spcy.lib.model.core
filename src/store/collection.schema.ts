/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import * as m from './collection.model';

const CollectionType: r.TypeInfo = {
  $id: 'Collection',
  $package: 'lib.standard.core',
  type: 'object',
  required: ['name', 'collection'],
  properties: {
    name: {
      type: 'string'
    },
    icon: {
      type: 'string'
    },
    collection: {
      $ref: 'ReferenceSet',
      $refPackage: 'lib.core.reflection'
    }
  }
};

const Collection: r.Prototype<m.Collection> = {
  ref: { $ref: CollectionType.$id!, $refPackage: CollectionType.$package! },
  typeInfo: CollectionType
};

const CollectionWithTypeType: r.TypeInfo = {
  $id: 'CollectionWithType',
  $package: 'lib.standard.core',
  $typeArguments: ['T'],
  allOf: [
    {
      $ref: 'Collection',
      $refPackage: 'lib.standard.core'
    },
    {
      type: 'object',
      required: ['collection'],
      properties: {
        collection: {
          $ref: 'ReferenceSetWithType',
          $refPackage: 'lib.core.reflection',
          $arguments: [
            {
              $ref: 'T',
              $refPackage: 'lib.standard.core'
            }
          ],
          $refArguments: 'lib.standard.core.T'
        }
      }
    }
  ]
};

const CollectionWithType: r.PrototypeInfo = {
  ref: { $ref: CollectionWithTypeType.$id!, $refPackage: CollectionWithTypeType.$package! },
  typeInfo: CollectionWithTypeType
};

export const CollectionModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    Collection: CollectionType,
    CollectionWithType: CollectionWithTypeType
  }
};

export const Types = {
  Collection,
  CollectionWithType
};
