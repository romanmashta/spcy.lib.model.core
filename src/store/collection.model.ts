import { TypeInfo } from '@spcy/lib.core.reflection';

export interface ObjectStore {
  collections: Collection[];
}

export interface Collection {
  name: string;
  icon?: string;
}
