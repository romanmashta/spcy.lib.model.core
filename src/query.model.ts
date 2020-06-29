export type Statement = string | number | boolean | null | Statement[];

export interface Query {
  collection: string;
  columns?: string[];
  criteria?: Statement[];
}
