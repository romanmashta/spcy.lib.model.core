import '@spcy/lib.dev.tasty';
import { SchemaRepository, Types as ReflectionTypes, Prototype } from '@spcy/lib.core.reflection';
import { createInstance, getData } from '@spcy/lib.core.mst-model';
import { Types as ToDoTypes } from './models/to-do/index.schema';
import * as Core from '../src';
import { objRef, TypedCollection } from '../src';

SchemaRepository.registerTypes(ReflectionTypes);
SchemaRepository.registerTypes(ToDoTypes);
SchemaRepository.registerTypes(Core.Types);

test('Collection with inline type tests', () => {
  const todoCollection = createInstance(Core.Types.Collection, {
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
  const todoCollection = createInstance(Core.Types.Collection, {
    name: 'users',
    type: ToDoTypes.User.ref
  });
  expect(getData(todoCollection)).toMatchTastyShot('collection typeref');
});

const collection = <T>(
  name: string,
  proto: Prototype<T>,
  init: Partial<Core.Collection> = {}
): Core.TypedCollection<T> => ({ name, type: proto.ref, ...init });

test('Seeds tests', () => {
  const coreCollections = {
    collections: collection('Collection', Core.Types.Collection)
  };

  const appCollections = Core.createSet(coreCollections.collections, {
    tasks: collection('Tasks', ToDoTypes.ToDo),
    users: collection('Users', ToDoTypes.User),
    roles: collection('Role', ToDoTypes.Role)
  });

  const collections = {
    ...coreCollections,
    ...appCollections
  };

  const roles = Core.createSet(appCollections.roles, {
    admin: { name: 'admin' },
    user: { name: 'user' },
    guest: { name: 'guest' }
  });

  const users = Core.createSet(appCollections.users, {
    bill: { username: 'bill', roles: [roles.admin] },
    joe: { username: 'joe', roles: [roles.user] }
  });

  const tasks = Core.createSet(appCollections.tasks, {
    compile: { isDone: false, description: 'Compile Code', user: objRef(users.bill) },
    deploy: { isDone: false, description: 'Deploy Code', user: objRef(users.joe) }
  });

  const seed = {
    collections,
    roles,
    users,
    tasks
  };

  expect(seed).toMatchTastyShot('collection seed');
});
