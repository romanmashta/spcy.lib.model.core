export type Statement = string | number | boolean | null | Statement[];

export interface Query {
  collection: string;
  criteria?: Statement[];
}
