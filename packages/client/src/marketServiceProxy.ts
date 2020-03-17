import { marketServiceDefinition } from '@scalecubejs-example-trading/api';
import { getProxy } from './msSeed';

export const marketService = getProxy({
  serviceDefinition: marketServiceDefinition,
});
