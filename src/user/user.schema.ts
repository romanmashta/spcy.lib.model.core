/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import * as m from './user.model';

const ToDoType: r.TypeInfo = {
  $id: 'ToDo',
  $package: 'lib.standard.core',
  type: 'object',
  required: ['isDone'],
  properties: {
    isDone: {
      type: 'boolean'
    },
    description: {
      type: 'string'
    },
    user: {
      $ref: 'ReferenceWithType',
      $refPackage: 'lib.core.reflection',
      $arguments: [
        {
          $ref: 'User',
          $refPackage: 'lib.standard.core'
        }
      ],
      $refArguments: 'lib.standard.core.User'
    }
  }
};

const ToDo: r.Prototype<m.ToDo> = {
  ref: { $ref: ToDoType.$id!, $refPackage: ToDoType.$package! },
  typeInfo: ToDoType
};

const UserType: r.TypeInfo = {
  $id: 'User',
  $package: 'lib.standard.core',
  type: 'object',
  required: ['username', 'roles'],
  properties: {
    username: {
      type: 'string'
    },
    roles: {
      type: 'array',
      items: {
        $ref: 'Role',
        $refPackage: 'lib.standard.core'
      }
    }
  }
};

const User: r.Prototype<m.User> = {
  ref: { $ref: UserType.$id!, $refPackage: UserType.$package! },
  typeInfo: UserType
};

const RoleType: r.TypeInfo = {
  $id: 'Role',
  $package: 'lib.standard.core',
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string'
    }
  }
};

const Role: r.Prototype<m.Role> = {
  ref: { $ref: RoleType.$id!, $refPackage: RoleType.$package! },
  typeInfo: RoleType
};

export const UserModule: r.Module = {
  $id: 'lib.standard.core',
  $defs: {
    ToDo: ToDoType,
    User: UserType,
    Role: RoleType
  }
};

export const Types = {
  ToDo,
  User,
  Role
};
