/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import * as m from './collection-view.model';

const CollectionViewType: r.TypeInfo = {
  $id: 'CollectionView',
  $package: 'lib.standard.core',
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string'
    }
  }
};

const CollectionView: r.Prototype<m.CollectionView> = {
  ref: { $ref: CollectionViewType.$id!, $refPackage: CollectionViewType.$package! },
  typeInfo: CollectionViewType
};

export const CollectionViewModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    CollectionView: CollectionViewType
  }
};

export const Types = {
  CollectionView
};
