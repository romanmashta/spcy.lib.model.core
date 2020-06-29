import { BooleanType, NullType, NumberType, StringType, TypeInfo } from '@spcy/lib.core.reflection';

export type Statement = StringType | NumberType | BooleanType | NullType | Statement[];

export interface QueryModel {
  collection: string;
  columns: TypeInfo;
  criteria: Statement[];
}
