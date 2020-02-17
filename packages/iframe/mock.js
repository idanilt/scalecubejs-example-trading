import { createMicroservice, ASYNC_MODEL_TYPES } from '@scalecube/browser';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
const chartServiceDefinition = {
  serviceName: 'chartService',
  methods: {
    history$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};

const subject = new ReplaySubject(1);

subject.next([
  [
    {
      type: 'string',
      id: 'Date',
    },
    {
      type: 'number',
      label: 'Something',
    },
    {
      type: 'number',
      label: 'Something',
    },
    {
      type: 'number',
      label: 'Something',
    },
    {
      type: 'number',
      label: 'Something',
    },
  ],
  ['Mon', 20, 28, 38, 45],
  ['Tue', 31, 38, 55, 66],
  ['Wed', 50, 55, 77, 80],
  ['Thu', 77, 77, 66, 50],
  ['Fri', 68, 66, 22, 15],
]);

createMicroservice({
  address: 'seed',
  services: [
    {
      definition: chartServiceDefinition,
      reference: {
        history$: () => subject.pipe(distinctUntilChanged()).asObservable(),
      },
    },
  ],
});
