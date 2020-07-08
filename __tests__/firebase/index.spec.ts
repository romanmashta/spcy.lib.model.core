import '@spcy/lib.dev.tasty';
import { SchemaRepository, Types as ReflectionTypes } from '@spcy/lib.core.reflection';

SchemaRepository.registerTypes(ReflectionTypes);

test('Creates app', async () => {});
