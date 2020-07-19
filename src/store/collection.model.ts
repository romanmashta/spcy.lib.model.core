import { ReferenceSet, ReferenceSetWithType } from '@spcy/lib.core.reflection';

export interface Collection {
  name: string;
  icon?: string;
  collection: ReferenceSet;
}

export interface CollectionWithType<T> extends Collection {
  collection: ReferenceSetWithType<T>;
}
