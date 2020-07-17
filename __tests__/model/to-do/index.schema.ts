import * as r from '@spcy/lib.core.reflection';
import { ToDoModule, Types as ToDoTypes } from './to-do.schema';
import { AppBoxModule, Types as AppBoxTypes } from './app-box.schema';

export const IndexModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    ...ToDoModule.$defs,
    ...AppBoxModule.$defs
  }
};

export const Types = {
  ...ToDoTypes,
  ...AppBoxTypes
};
