import * as r from '@spcy/lib.core.reflection';
import * as m from './collection.model';

const CollectionType: r.TypeInfo = {
  $id: 'Collection',
  $package: 'lib.model.core',
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
      $ref: 'TypeInfo',
      $refPackage: 'lib.core.reflection'
    }
  }
};

const Collection: r.Prototype<m.Collection> = {
  ref: { $ref: CollectionType.$id!, $refPackage: CollectionType.$package! },
  typeInfo: CollectionType
};

export const CollectionModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    Collection: CollectionType
  }
};

export const Types = {
  Collection
};
