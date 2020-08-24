/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import * as m from './alias.model';

const AliasType: r.TypeInfo = {
  $id: 'Alias',
  $package: 'lib.standard.core',
  type: 'object',
  required: ['name', 'Target'],
  properties: {
    icon: {
      $ref: 'ReferenceWithType',
      $refPackage: 'lib.core.reflection',
      $arguments: [
        {
          $ref: 'Icon',
          $refPackage: 'lib.standard.icons'
        }
      ],
      $refArguments: 'lib.standard.icons.Icon'
    },
    name: {
      type: 'string'
    },
    Target: {
      $ref: 'Reference',
      $refPackage: 'lib.core.reflection'
    }
  }
};

const Alias: r.Prototype<m.Alias> = {
  ref: { $ref: AliasType.$id!, $refPackage: AliasType.$package! },
  typeInfo: AliasType
};

export const AliasModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    Alias: AliasType
  }
};

export const Types = {
  Alias
};
