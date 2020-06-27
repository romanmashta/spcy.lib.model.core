import '@spcy/lib.dev.tasty';
import { ModelRepository } from '@spcy/lib.core.mst-model';
import { getSnapshot } from '@spcy/pub.mobx-state-tree';
import { CollectionSchema, ObjectStoreSchema } from '../src/collection.schema';
import { Collection, ObjectStore } from '../src';
import { ToDoSchema, UserSchema } from './to-do/to-do.schema';

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
