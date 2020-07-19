import * as r from '@spcy/lib.core.reflection';
import * as m from './collection.model';

const CollectionType: r.TypeInfo = {
  $id: 'Collection',
  $package: 'lib.model.core',
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
  $package: 'lib.model.core',
  $typeArguments: ['T'],
  allOf: [
    {
      $ref: 'Collection',
      $refPackage: 'lib.model.core'
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
              $refPackage: 'lib.model.core'
            }
          ],
          $refArguments: 'lib.model.core.T'
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
  $id: 'lib.model.core',
  $defs: {
    Collection: CollectionType,
    CollectionWithType: CollectionWithTypeType
  }
};

export const Types = {
  Collection,
  CollectionWithType
};
