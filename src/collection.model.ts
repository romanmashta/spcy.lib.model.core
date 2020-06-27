import { TypeInfo } from '@spcy/lib.core.reflection';

export interface Collection {
  name: string;
  icon?: string;
  type: TypeInfo;
}
