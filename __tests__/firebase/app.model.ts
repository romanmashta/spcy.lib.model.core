import { CollectionWithType, FirebaseApp } from '../../src';
import { ToDo, User } from '../model/to-do/to-do.model';

export interface App extends FirebaseApp {
  collections?: {
    users: CollectionWithType<User>;
    tasks: CollectionWithType<ToDo>;
  };
}
