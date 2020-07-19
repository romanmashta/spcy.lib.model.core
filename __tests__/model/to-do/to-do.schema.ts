import * as r from '@spcy/lib.core.reflection';
import * as m from './to-do.model';

const ToDoType: r.TypeInfo = {
  $id: 'ToDo',
  $package: 'lib.model.core',
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
          $refPackage: 'lib.model.core'
        }
      ],
      $refArguments: 'lib.model.core.User'
    }
  }
};

const ToDo: r.Prototype<m.ToDo> = {
  ref: { $ref: ToDoType.$id!, $refPackage: ToDoType.$package! },
  typeInfo: ToDoType
};

const UserType: r.TypeInfo = {
  $id: 'User',
  $package: 'lib.model.core',
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
        $refPackage: 'lib.model.core'
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
  $package: 'lib.model.core',
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

export const ToDoModule: r.Module = {
  $id: 'lib.model.core',
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
