import '@spcy/lib.dev.tasty';
import { SchemaRepository, Types as ReflectionTypes } from '@spcy/lib.core.reflection';
import { createInstance, getData } from '@spcy/lib.core.mst-model';
import { Types as ToDoTypes } from './models/to-do/index.schema';
import { Types as CoreTypes } from '../src';
import { User } from './models/to-do/to-do.model';

SchemaRepository.registerTypes(ReflectionTypes);
SchemaRepository.registerTypes(ToDoTypes);
SchemaRepository.registerTypes(CoreTypes);

test('Collection with inline type tests', () => {
  const todoCollection = createInstance(CoreTypes.Collection, {
    name: 'to-do',
    type: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }
      }
    }
  });
  expect(getData(todoCollection)).toMatchTastyShot('collection inline');
});

test('Collection with type ref tests', () => {
  const todoCollection = createInstance(CoreTypes.Collection, {
    name: 'users',
    type: ToDoTypes.User
  });
  expect(getData(todoCollection)).toMatchTastyShot('collection typeref');
});

test('Object store tests', () => {
  const objectStore = createInstance(CoreTypes.ObjectStore, {
    collections: [
      {
        name: 'to-do',
        type: ToDoTypes.ToDo
      },
      {
        name: 'users',
        type: ToDoTypes.User
      }
    ]
  });
  expect(getData(objectStore)).toMatchTastyShot('object-store');
});

test('Query tests', () => {
  const query = createInstance(ToDoTypes.Late<User>(), {
    resolving: false,
    value: {
      username: 'hello'
    }
  });
  query.resolve();
  query.value
  expect(getData(query)).toMatchTastyShot('query-store');
});
