import { Ref } from '../../../src/store';

export interface ToDo {
  isDone: boolean;
  description?: string;
  user?: Ref<User>;
}

export interface User {
  username: string;
  roles: Role[];
}

export interface Role {
  name: string;
}
