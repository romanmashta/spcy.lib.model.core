import * as r from '@spcy/lib.core.reflection';
import * as m from './app.model';

const AppType: r.TypeInfo = {
  $id: 'App',
  $package: 'lib.model.core',
  allOf: [
    {
      $ref: 'FirebaseApp',
      $refPackage: 'lib.model.core'
    },
    {
      type: 'object',
      properties: {
        collections: {
          type: 'object',
          required: ['users', 'tasks'],
          properties: {
            users: {
              $ref: 'CollectionWithType',
              $refPackage: 'lib.model.core',
              $arguments: [
                {
                  $ref: 'User',
                  $refPackage: 'lib.model.core'
                }
              ],
              $refArguments: 'lib.model.core.User'
            },
            tasks: {
              $ref: 'CollectionWithType',
              $refPackage: 'lib.model.core',
              $arguments: [
                {
                  $ref: 'ToDo',
                  $refPackage: 'lib.model.core'
                }
              ],
              $refArguments: 'lib.model.core.ToDo'
            }
          }
        }
      }
    }
  ]
};

const App: r.Prototype<m.App> = {
  ref: { $ref: AppType.$id!, $refPackage: AppType.$package! },
  typeInfo: AppType
};

export const AppModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    App: AppType
  }
};

export const Types = {
  App
};
