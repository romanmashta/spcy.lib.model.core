import * as r from '@spcy/lib.core.reflection';
import * as m from './application.model';

const FirebaseConfigType: r.TypeInfo = {
  $id: 'FirebaseConfig',
  $package: 'lib.model.core',
  type: 'object',
  required: ['apiKey', 'authDomain', 'databaseURL', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'],
  properties: {
    apiKey: {
      type: 'string'
    },
    authDomain: {
      type: 'string'
    },
    databaseURL: {
      type: 'string'
    },
    projectId: {
      type: 'string'
    },
    storageBucket: {
      type: 'string'
    },
    messagingSenderId: {
      type: 'string'
    },
    appId: {
      type: 'string'
    }
  }
};

const FirebaseConfig: r.Prototype<m.FirebaseConfig> = {
  ref: { $ref: FirebaseConfigType.$id!, $refPackage: FirebaseConfigType.$package! },
  typeInfo: FirebaseConfigType
};

const FirebaseAppType: r.TypeInfo = {
  $id: 'FirebaseApp',
  $package: 'lib.model.core',
  type: 'object',
  required: ['name', 'config'],
  properties: {
    name: {
      type: 'string'
    },
    config: {
      $ref: 'FirebaseConfig',
      $refPackage: 'lib.model.core'
    },
    collections: {
      type: 'object',
      additionalProperties: {
        $ref: 'Collection',
        $refPackage: 'lib.model.core'
      }
    }
  }
};

const FirebaseApp: r.Prototype<m.FirebaseApp> = {
  ref: { $ref: FirebaseAppType.$id!, $refPackage: FirebaseAppType.$package! },
  typeInfo: FirebaseAppType
};

const ActivableType: r.TypeInfo = {
  $id: 'Activable',
  $package: 'lib.model.core',
  type: 'object'
};

const Activable: r.Prototype<m.Activable> = {
  ref: { $ref: ActivableType.$id!, $refPackage: ActivableType.$package! },
  typeInfo: ActivableType
};

export const ApplicationModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    FirebaseConfig: FirebaseConfigType,
    FirebaseApp: FirebaseAppType,
    Activable: ActivableType
  }
};

export const Types = {
  FirebaseConfig,
  FirebaseApp,
  Activable
};
