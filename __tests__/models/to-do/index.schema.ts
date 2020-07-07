import * as r from '@spcy/lib.core.reflection';
import { ToDoModule, Types as ToDoTypes } from './to-do.schema';

const PackageName = 'lib.model.core';

export const IndexModule: r.Module = {
  $id: PackageName,
  $defs: {
    ...ToDoModule.$defs
  }
};

export const Types = {
  ...ToDoTypes
};
