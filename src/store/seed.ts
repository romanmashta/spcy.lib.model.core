import _ from 'lodash';
import * as Reflection from '@spcy/lib.core.reflection';
import { Collection } from './collection.model';
import { Query } from './query.model';

export interface TypedCollection<T> extends Collection {
  _?: string;
}

export interface ObjectSet<T> {
  [objectId: string]: T;
}

export interface Resolvable {
  ref(): string;
}

export const objRef = (obj: unknown) => ({ $ref: (obj as Resolvable).ref() });
export const $ = objRef;

export const createSet = <U extends ObjectSet<T>, T>(collection: TypedCollection<T>, objects: U): U => {
  const collectionRefFunc = ((collection as unknown) as Resolvable).ref;
  const collectionRef = collectionRefFunc ? `${collectionRefFunc()}/` : '';
  const ref = (id: string) => `${collectionRef}${id}`;
  const seed = _.reduce(objects, (r, v, k) => ({ ...r, [k]: { ...v, ref: () => ref(k) } }), {});
  return seed as U;
};

export const collection = <T>(
  name: string,
  proto: Reflection.Prototype<T>,
  init: Partial<Collection> = {}
): TypedCollection<T> => ({ name, collection: { $type: proto.ref }, ...init });

export const query = <T>(proto: Reflection.Prototype<T>, init: Query): Query => ({
  collection: { $type: proto.ref },
  ...init
});
