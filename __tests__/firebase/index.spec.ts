import _ from 'lodash';
import '@spcy/lib.dev.tasty';
import * as Reflection from '@spcy/lib.core.reflection';
import { createInstance } from '@spcy/lib.core.mst-model';
import * as firebase from 'firebase';
import * as Core from '../../src';
import { collection, query, queryInterface } from '../../src';

Reflection.SchemaRepository.registerTypes(Reflection.Types);
Reflection.SchemaRepository.registerTypes(Core.Types);

const app = createInstance(Core.Types.FirebaseApp, {
  name: 'Sandbox',
  config: {
    apiKey: process.env.FB_API_KEY!,
    authDomain: 'mono-space-d38be.firebaseapp.com',
    databaseURL: 'https://mono-space-d38be.firebaseio.com',
    projectId: 'mono-space-d38be',
    storageBucket: 'mono-space-d38be.appspot.com',
    messagingSenderId: '441937998030',
    appId: '1:441937998030:web:fdba428e92505aae8e609f'
  }
});

test('Seed app', async done => {
  // done();
  // return;
  // eslint-disable-next-line no-unreachable
  firebase.initializeApp(app.config);

  const db = firebase.firestore();

  const appCollections = Core.createSet(Core.Seed.collections.collections, {
    tasks: collection('Tasks', Core.Types.ToDo),
    users: collection('Users', Core.Types.User),
    roles: collection('Role', Core.Types.Role)
  });

  const queries = Core.createSet(Core.Seed.collections.queries, {
    completed: query(Core.Types.ToDo, {
      name: 'Completed',
      source: Core.objRef(appCollections.tasks),
      columns: ['isDone', 'description', 'user'],
      criteria: [{ fieldPath: 'isDone', op: '==', value: true }]
    }),
    toDo: query(Core.Types.ToDo, {
      name: 'To Do',
      source: Core.objRef(appCollections.tasks),
      columns: ['isDone', 'description', 'user'],
      criteria: [{ fieldPath: 'isDone', op: '==', value: false }]
    })
  });

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
    compile2: {
      isDone: true,
      description: 'Compile Code 2',
      user: Core.objRef(users.bill)
    },
    compile3: {
      isDone: false,
      description: 'Compile Code 3',
      user: Core.objRef(users.bill)
    },
    compile4: {
      isDone: false,
      description: 'Compile Code 4',
      user: Core.objRef(users.bill)
    },
    deploy: {
      isDone: false,
      description: 'Deploy Code',
      user: Core.objRef(users.joe)
    }
  });

  const collections = {
    ...appCollections
  };

  const appSeed = {
    collections,
    roles,
    users,
    tasks,
    queries
  };

  const seed = _.merge(Reflection.Seed, Core.Seed, appSeed);

  await Promise.all(
    _.flatten(
      _.map(seed, (objectSet, collectionName) =>
        _.map(objectSet, (obj: object, id) =>
          db
            .collection(collectionName)
            .doc(id)
            .set(JSON.parse(JSON.stringify(obj)))
        )
      )
    )
  );

  console.log(JSON.stringify(seed, undefined, 2));
  done();
});

test('Get data from firestore', async done => {
  done();
  return;
  // eslint-disable-next-line no-unreachable
  const appController = queryInterface(app, Core.Types.Activable)!;
  await appController.activate();
  console.log('activated');
  const tasks = app.collections?.tasks;
  const users = app.collections?.users;

  const tasksController = queryInterface(tasks, Core.Types.Activable)!;
  await tasksController.activate();
  console.log('collection tasks', JSON.stringify(tasks, undefined, 2));

  const usersController = queryInterface(users, Core.Types.Activable)!;
  await usersController.activate();
  console.log('collection users', JSON.stringify(users, undefined, 2));

  await appController.deactivate();
  console.log('deactivated');
  done();
});
