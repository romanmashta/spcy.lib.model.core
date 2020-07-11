import _ from 'lodash';
import { Collection } from './collection.model';

export interface TypedCollection<T> extends Collection {
  _?: string;
}

export interface ObjectSet<T> {
  [objectId: string]: T;
}

export interface Ref<T> {
  $ref: string;
  resolving?: boolean;
  value?: T;
  resolve?(): Promise<T>;
}

export interface Resolvable {
  ref(): string;
}

export const objRef = (obj: unknown) => ({ $ref: (obj as Resolvable).ref() });

export const createSet = <U extends ObjectSet<T>, T>(collection: TypedCollection<T>, objects: U): U => {
  const collectionRefFunc = ((collection as unknown) as Resolvable).ref;
  const collectionRef = collectionRefFunc ? `${collectionRefFunc()}/` : '';
  const ref = (id: string) => `${collectionRef}${id}`;
  const seed = _.reduce(objects, (r, v, k) => ({ ...r, [k]: { ...v, ref: () => ref(k) } }), {});
  return seed as U;
};
