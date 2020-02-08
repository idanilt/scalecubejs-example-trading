import { createMicroservice, ASYNC_MODEL_TYPES } from '@scalecube/browser';

export const MarketServiceDefinition = {
  serviceName: 'MarketService',
  methods: {
    assets$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
    asset$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};

const microservice = createMicroservice({ seedAddress: 'seed', debug: true, address: 'asset' });

export const marketService = microservice.createProxy({
  serviceDefinition: MarketServiceDefinition,
});
