import { Reference, ReferenceWithType } from '@spcy/lib.core.reflection';
import { Icon } from '@spcy/lib.standard.icons';

export interface Alias {
  icon?: ReferenceWithType<Icon>;
  name: string;
  Target: Reference;
}
