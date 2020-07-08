import * as r from '@spcy/lib.core.reflection';
import * as m from './app-box.model';

const CollectionType: r.TypeInfo = {
  $id: 'Collection',
  $package: 'lib.model.core',
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string'
    }
  }
};

const Collection: r.Prototype<m.Collection> = {
  $ref: CollectionType.$id!,
  $refPackage: CollectionType.$package!,
  typeInfo: CollectionType
};

const FooCollectionsType: r.TypeInfo = {
  $id: 'FooCollections',
  $package: 'lib.model.core',
  type: 'object',
  required: ['toDo', 'users'],
  properties: {
    toDo: {
      $ref: 'Collection',
      $refPackage: 'lib.model.core'
    },
    users: {
      $ref: 'Collection',
      $refPackage: 'lib.model.core'
    }
  }
};

const FooCollections: r.Prototype<m.FooCollections> = {
  $ref: FooCollectionsType.$id!,
  $refPackage: FooCollectionsType.$package!,
  typeInfo: FooCollectionsType
};

const LateType: r.TypeInfo = {
  $id: 'Late',
  $package: 'lib.model.core',
  type: 'object',
  required: ['resolving', 'value'],
  properties: {
    resolving: {
      type: 'boolean'
    },
    value: {
      $ref: 'T',
      $refPackage: 'lib.model.core'
    }
  }
};

const Late = <T>(): r.Prototype<m.Late<T>> => ({
  $ref: LateType.$id!,
  $refPackage: LateType.$package!,
  typeInfo: LateType
});

const AppBoxType: r.TypeInfo = {
  $id: 'AppBox',
  $package: 'lib.model.core',
  type: 'object',
  required: ['name', 'collections'],
  properties: {
    name: {
      type: 'string'
    },
    collections: {
      $ref: 'Late',
      $refPackage: 'lib.model.core',
      $arguments: [
        {
          type: 'string'
        }
      ]
    }
  }
};

const AppBox: r.Prototype<m.AppBox> = {
  $ref: AppBoxType.$id!,
  $refPackage: AppBoxType.$package!,
  typeInfo: AppBoxType
};

export const AppBoxModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    Collection: CollectionType,
    FooCollections: FooCollectionsType,
    Late: LateType,
    AppBox: AppBoxType
  }
};

export const Types = {
  Collection,
  FooCollections,
  Late,
  AppBox
};
