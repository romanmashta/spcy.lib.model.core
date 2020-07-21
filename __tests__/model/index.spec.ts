import '@spcy/lib.dev.tasty';
import { SchemaRepository, Types as ReflectionTypes } from '@spcy/lib.core.reflection';
import { createInstance, getData } from '@spcy/lib.core.mst-model';
import { Types as ToDoTypes } from './to-do/index.schema';
import * as Core from '../../src';
import { collection, queryInterface, registerController } from '../../src';

SchemaRepository.registerTypes(ReflectionTypes);
SchemaRepository.registerTypes(ToDoTypes);
SchemaRepository.registerTypes(Core.Types);

test('Collection with inline type tests', () => {
  const todoCollection = createInstance(Core.Types.Collection, {
    name: 'to-do',
    collection: {
      $type: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          }
        }
      }
    }
  });
  expect(getData(todoCollection)).toMatchTastyShot('collection inline');
});

test('Collection with type ref tests', () => {
  const todoCollection = createInstance(Core.Types.Collection, {
    name: 'users',
    collection: {
      $type: ToDoTypes.User.ref
    }
  });
  expect(getData(todoCollection)).toMatchTastyShot('collection typeref');
});

test('Seeds model tests', () => {
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
    compile: {
      isDone: false,
      description: 'Compile Code',
      user: Core.objRef(users.bill)
    },
    deploy: {
      isDone: false,
      description: 'Deploy Code',
      user: Core.objRef(users.joe)
    }
  });

  const seed = {
    collections,
    roles,
    users,
    tasks
  };

  expect(seed).toMatchTastyShot('collection seed');
});

class DummyUserController implements Core.Activable {
  active = false;

  activate(): void {
    this.active = true;
  }

  deactivate(): void {
    this.active = false;
  }
}

registerController(DummyUserController, ToDoTypes.User, Core.Types.Activable);

test('Query component for model', () => {
  const user = createInstance(ToDoTypes.User, {
    username: 'joe',
    roles: []
  });
  const c1 = queryInterface(user, Core.Types.Activable);
  const c2 = queryInterface(user, Core.Types.Activable);
  expect(c1).toBe(c2);
});
