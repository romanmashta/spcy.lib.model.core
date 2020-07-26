import { TypeInfo } from '@spcy/lib.core.reflection';

export interface Activable {
  activate(): void;
  deactivate(): void;
}

export interface NodeActions {
  add<T>(selector?: (types: TypeInfo[]) => Promise<TypeInfo>, modifier?: (obj: T) => Promise<T>): void;
  remove(node: unknown): void;
}
