import '@spcy/lib.dev.tasty';
import * as cr from '@spcy/lib.core.reflection';
import { createInstance, getData } from '@spcy/lib.core.mst-model';
import * as Core from '../../src';
import { collection, queryInterface, registerController } from '../../src';
import * as ToDo from '../models/to-do';

cr.SchemaRepository.registerTypes(cr.Types);
cr.SchemaRepository.registerTypes(Core.Types);
cr.SchemaRepository.registerTypes(ToDo.Types);

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
      $type: Core.Types.User.ref
    }
  });
  expect(getData(todoCollection)).toMatchTastyShot('collection typeref');
});

test('Seeds model tests', () => {
  const coreCollections = {
    collections: collection('Collection', Core.Types.Collection)
  };

  const appCollections = Core.createSet(coreCollections.collections, {
    tasks: collection('Tasks', Core.Types.ToDo),
    users: collection('Users', Core.Types.User),
    roles: collection('Role', Core.Types.Role)
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

registerController(DummyUserController, Core.Types.User, Core.Types.Activable);

test('Query component for model', () => {
  const user = createInstance(Core.Types.User, {
    username: 'joe',
    roles: []
  });
  const c1 = queryInterface(user, Core.Types.Activable);
  const c2 = queryInterface(user, Core.Types.Activable);
  expect(c1).toBe(c2);
});

test('Add string to string array', async done => {
  const user = createInstance(ToDo.Types.UserWithRoles, { name: 'john', roles: [] });
  const { roles } = user;

  const nodeActions = queryInterface(roles, Core.Types.NodeActions);

  await nodeActions?.add(undefined, async () => {
    return 'admin';
  });

  await nodeActions?.add(undefined, async () => {
    return 'guest';
  });

  expect(user).toMatchTastyShot('user with roles admin');
  done();
});

test('Add user to array', async done => {
  const room = createInstance(ToDo.Types.Room, { name: 'kitchen', users: [] });
  const { users } = room;

  const nodeActions = queryInterface(users, Core.Types.NodeActions);

  await nodeActions?.add<ToDo.UserWithRoles>(undefined, async user => {
    user.patch(self => {
      self.name = 'john';
      self.roles = ['admin'];
    });
    return user;
  });

  await nodeActions?.add<ToDo.UserWithRoles>(undefined, async user => {
    user.patch(self => {
      self.name = 'doe';
      self.roles = ['guest'];
    });
    return user;
  });

  expect(room).toMatchTastyShot('room with users');
  done();
});
