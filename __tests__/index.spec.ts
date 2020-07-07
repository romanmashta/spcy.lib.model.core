import '@spcy/lib.dev.tasty';
import { SchemaRepository, Types as ReflectionTypes } from '@spcy/lib.core.reflection';
import { createInstance } from '@spcy/lib.core.mst-model';
import { getSnapshot } from '@spcy/pub.mobx-state-tree';
import { Types as ToDoTypes } from './models/to-do/index.schema';
import { Types as CoreTypes } from '../src';

SchemaRepository.registerTypes(ReflectionTypes);
SchemaRepository.registerTypes(ToDoTypes);
SchemaRepository.registerTypes(CoreTypes);

test('Collection tests', () => {
  const todoCollection = createInstance(CoreTypes.Collection, {
    name: 'to-do'
  });

  expect(getSnapshot(todoCollection)).toMatchTastyShot('collection');
});

test('Object store tests', () => {
  const objectStore = createInstance(CoreTypes.ObjectStore, {
    collections: [
      {
        name: 'to-do'
      },
      {
        name: 'users'
      }
    ]
  });
  expect(getSnapshot(objectStore)).toMatchTastyShot('object-store');
});

test('Query tests', () => {
  const query = createInstance(CoreTypes.Query, {
    collection: 'to-do',
    criteria: ['country', 'in', ['USA', 'Japan']]
  });
  expect(getSnapshot(query)).toMatchTastyShot('query-store');
});
