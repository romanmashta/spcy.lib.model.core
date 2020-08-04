/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import * as m from './common.model';

const ActivableType: r.TypeInfo = {
  $id: 'Activable',
  $package: 'lib.model.core',
  type: 'object'
};

const Activable: r.Prototype<m.Activable> = {
  ref: { $ref: ActivableType.$id!, $refPackage: ActivableType.$package! },
  typeInfo: ActivableType
};

const NodeActionsType: r.TypeInfo = {
  $id: 'NodeActions',
  $package: 'lib.model.core',
  type: 'object'
};

const NodeActions: r.Prototype<m.NodeActions> = {
  ref: { $ref: NodeActionsType.$id!, $refPackage: NodeActionsType.$package! },
  typeInfo: NodeActionsType
};

export const CommonModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    Activable: ActivableType,
    NodeActions: NodeActionsType
  }
};

export const Types = {
  Activable,
  NodeActions
};
