import { createMicroservice } from '@scalecube/browser';
const microservice = createMicroservice({ address: 'seed', debug: true });

export const getProxy = (definition: any) => microservice.createProxy(definition);
