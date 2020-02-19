import { ASYNC_MODEL_TYPES, createMicroservice } from '@scalecube/browser';
import { remoteServiceDefinition } from './services';
import { ReplaySubject } from 'rxjs';
import { take, toArray, repeat } from 'rxjs/operators';

const chartServiceDefinition = {
  serviceName: 'chartService',
  methods: {
    history$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};

createMicroservice({
  // debug: true,
  seedAddress: 'seed',
  address: 'chartService',
  services: [
    {
      definition: chartServiceDefinition,
      reference: ({ createProxy }) => {
        const remoteService = createProxy({ serviceDefinition: remoteServiceDefinition });

        const subject = new ReplaySubject(1);
        const data: any[] = [['x']];
        let count = 0;
        remoteService
          .assets$()
          .pipe(take(200), toArray(), repeat())
          .subscribe((assets: any[]) => {
            // assets = assets.slice(1, 4);
            if (count === 0) {
              assets.forEach((asset) => {
                data[0].push(asset.id + '');
              });
            }

            count++;
            const prices = assets.reduce(
              (arr, asset) => {
                arr.push(asset.price);
                return arr;
              },
              [count]
            );
            data.push(prices);

            // console.log('history$', data);

            subject.next(data);
          });

        subject.subscribe();
        return {
          history$: () => {
            return subject.asObservable();
          },
        };
      },
    },
  ],
});
