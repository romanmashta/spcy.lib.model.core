import { seedModule } from '@spcy/lib.core.reflection';
import { IndexModule } from './index.schema';

export const Seed = {
  ...seedModule(IndexModule)
};
