export interface Collection {
  name: string;
}

export interface FooCollections {
  toDo: Collection;
  users: Collection;
}

export interface Late<T> {
  resolving: boolean;
  value: T;
  resolve?(): Promise<T>;
}

export interface AppBox<T> {
  name: string;
  collections: Late<
    {
      [name: string]: Collection;
    } & T
  >;
}
