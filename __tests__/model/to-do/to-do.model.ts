import { ReferenceWithType } from '@spcy/lib.core.reflection';

export interface ToDo {
  isDone: boolean;
  description?: string;
  user?: ReferenceWithType<User>;
}

export interface User {
  username: string;
  roles: Role[];
}

export interface Role {
  name: string;
}
