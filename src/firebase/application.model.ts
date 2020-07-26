import { TypeInfo } from '@spcy/lib.core.reflection';
import { Collection } from '../store/index.model';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface FirebaseApp {
  name: string;
  config: FirebaseConfig;
  collections?: {
    [name: string]: Collection;
  };
}
