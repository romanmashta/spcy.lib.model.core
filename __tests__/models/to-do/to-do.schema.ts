import { TypeInfo, Module, SchemaRepository } from '@spcy/lib.core.reflection';

export const ToDoSchema: TypeInfo = {
  $id: '#/$defs/ToDo',
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

SchemaRepository.register(ToDoSchema);
export const UserSchema: TypeInfo = {
  $id: '#/$defs/User',
  type: 'object',
  required: ['username'],
  properties: {
    username: {
      type: 'string'
    }
  }
};

SchemaRepository.register(UserSchema);

export const MetaSchema: Module = {
  $defs: {
    ToDo: ToDoSchema,
    User: UserSchema
  }
};
