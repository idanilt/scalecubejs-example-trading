import { ASYNC_MODEL_TYPES } from '@scalecube/browser';

export const marketServiceDefinition = {
  serviceName: 'MarketService',
  methods: {
    assets$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
    asset$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
    setAssetsInView: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
    getAssetsInView: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
    setAssetDetail: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
    getAssetDetail$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};
