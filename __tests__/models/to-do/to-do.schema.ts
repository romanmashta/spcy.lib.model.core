import { TypeInfo, Module } from '@spcy/lib.core.reflection';

const ToDo: TypeInfo = {
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

const User: TypeInfo = {
  $id: 'User',
  type: 'object',
  required: ['username'],
  properties: {
    username: {
      type: 'string'
    }
  }
};

export const ToDoSchema: Module = {
  $id: '@spcy/lib.model.core',
  $defs: {
    ToDo,
    User
  }
};
