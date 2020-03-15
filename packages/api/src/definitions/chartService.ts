import { ASYNC_MODEL_TYPES } from '@scalecube/browser';

export const chartServiceDefinition = {
  serviceName: 'chartService',
  methods: {
    history$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};
