import * as r from '@spcy/lib.core.reflection';
import { ToDoModule, Types as ToDoTypes } from './to-do.schema';

export const IndexModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    ...ToDoModule.$defs
  }
};

export const Types = {
  ...ToDoTypes
};
