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
    }
  }
};

const ToDo: r.Prototype<m.ToDo> = {
  $ref: ToDoType.$id!,
  $refPackage: ToDoType.$package!,
  typeInfo: ToDoType
};

const UserType: r.TypeInfo = {
  $id: 'User',
  $package: 'lib.model.core',
  type: 'object',
  required: ['username'],
  properties: {
    username: {
      type: 'string'
    }
  }
};

const User: r.Prototype<m.User> = {
  $ref: UserType.$id!,
  $refPackage: UserType.$package!,
  typeInfo: UserType
};

export const ToDoModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    ToDo: ToDoType,
    User: UserType
  }
};

export const Types = {
  ToDo,
  User
};
