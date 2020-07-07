import * as r from '@spcy/lib.core.reflection';
import * as m from './to-do.model';

const PackageName = 'lib.model.core';

const ToDoType: r.TypeInfo = {
  $id: 'ToDo',
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
  id: ToDoType.$id,
  package: PackageName,
  typeInfo: ToDoType
};
const UserType: r.TypeInfo = {
  $id: 'User',
  type: 'object',
  required: ['username'],
  properties: {
    username: {
      type: 'string'
    }
  }
};
const User: r.Prototype<m.User> = {
  id: UserType.$id,
  package: PackageName,
  typeInfo: UserType
};

export const ToDoModule: r.Module = {
  $id: PackageName,
  $defs: {
    ToDo: ToDoType,
    User: UserType
  }
};

export const Types = {
  ToDo,
  User
};
