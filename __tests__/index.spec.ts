import '@spcy/lib.dev.tasty';
import { ModelRepository } from '@spcy/lib.core.mst-model';
import { getSnapshot } from '@spcy/pub.mobx-state-tree';
import { CollectionSchema, ObjectStoreSchema } from '../src/store/collection.schema';
import { Collection, ObjectStore, Query } from '../src';
import { ToDoSchema, UserSchema } from './models/to-do/to-do.schema';
import { QuerySchema } from '../src/store/query.schema';

test('Collection tests', () => {
  const collectionModel = ModelRepository.resolve(CollectionSchema.$id!);
  const collectionData: Collection = {
    name: 'to-do',
    type: {
      $ref: ToDoSchema.$id!
    }
  };
  const collection = collectionModel.create(collectionData);
  expect(getSnapshot(collection)).toMatchTastyShot('collection');
  expect(true).toBeTruthy();
});

test('Object store tests', () => {
  const objectStoreModel = ModelRepository.resolve(ObjectStoreSchema.$id!);
  const storeData: ObjectStore = {
    collections: [
      {
        name: 'to-do',
        type: {
          $ref: ToDoSchema.$id!
        }
      },
      {
        name: 'users',
        type: {
          $ref: UserSchema.$id!
        }
      }
    ]
  };
  const collection = objectStoreModel.create(storeData);
  expect(getSnapshot(collection)).toMatchTastyShot('object-store');
  expect(true).toBeTruthy();
});

test('Query tests', () => {
  const queryModel = ModelRepository.resolve(QuerySchema.$id!);
  const queryData: Query = {
    collection: 'to-do',
    criteria: ['country', 'in', ['USA', 'Japan']]
  };
  const collection = queryModel.create(queryData);
  expect(getSnapshot(collection)).toMatchTastyShot('query-store');
  expect(true).toBeTruthy();
});
