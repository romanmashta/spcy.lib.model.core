import { ReferenceSet, ReferenceWithType } from '@spcy/lib.core.reflection';
import { Collection } from './collection.model';

export type FieldPath = string | string[];

export type FilterOp = '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any';

export interface Expression {
  fieldPath: FieldPath;
  op: FilterOp;
  value: string | boolean | number;
}

export interface Query {
  name: string;
  icon?: string;
  source: ReferenceWithType<Collection>;
  columns: string[];
  criteria: Expression[];
  collection?: ReferenceSet;
}
