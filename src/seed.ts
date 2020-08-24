import { seedModule } from '@spcy/lib.core.reflection';
import * as Reflection from '@spcy/lib.core.reflection';
import { IndexModule, Types } from './index.schema';
import { collection } from './store';

const collections = {
  collections: collection('Collection', Types.Collection),
  types: collection('Types', Reflection.Types.Module),
  queries: collection('Queries', Types.Query),
  navigation: collection('Navigation', Types.Alias)
};

export const Seed = {
  ...seedModule(IndexModule),
  collections
};
