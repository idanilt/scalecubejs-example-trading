import { ASYNC_MODEL_TYPES } from '@scalecube/browser';

export const remoteServiceDefinition = {
  serviceName: 'remoteService',
  methods: {
    balance$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
    login: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
    logout: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
    placeOrder: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
    cancelOrder: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
    tradeActions$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
    pendingOrders$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};
