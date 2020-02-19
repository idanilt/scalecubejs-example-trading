import { createMicroservice, ASYNC_MODEL_TYPES } from '@scalecube/browser';
import { of, timer, Subject, ReplaySubject } from 'rxjs';
import { map, filter, tap, switchMap, take, delay, toArray, repeat } from 'rxjs/operators';

const remoteServiceDefinition = {
  serviceName: 'remoteService',
  methods: {
    assets$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};
export const MarketServiceDefinition = {
  serviceName: 'MarketService',
  methods: {
    assets$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
    asset$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};

createMicroservice({
  seedAddress: 'seed',
  address: 'marketService',
  debug: true,
  services: [
    {
      definition: MarketServiceDefinition,
      reference: ({ createProxy }) => {
        const assets = {};
        const remoteService = createProxy({ serviceDefinition: remoteServiceDefinition });
        remoteService.assets$().subscribe((i) => {
          assets[i.id] = i;
        });

        const ticks = new Subject();
        timer(0, 13).subscribe(() => ticks.next());
        const ready = new ReplaySubject(1);
        timer(0, 13)
          .pipe(
            filter(() => assets[399] !== undefined),
            delay(1000),
            take(1)
          )
          .subscribe(() => ready.next());

        return {
          assets$: () => {
            return ready
              .pipe(
                switchMap(() =>
                  of(
                    Object.keys(assets).map((k) => ({
                      id: assets[k].id,
                      name: assets[k].name,
                      type: assets[k].type,
                    }))
                  )
                ),
                take(1)
              )
              .toPromise();
          },
          asset$: (id) => {
            let lastTick;
            return ticks.pipe(
              map(() => {
                return assets[id];
              }),
              filter((i) => i.lastUpdate != lastTick),
              tap((i) => (lastTick = i.lastUpdate))
            );
          },
        };
      },
    },
  ],
});

const chartServiceDefinition = {
  serviceName: 'chartService',
  methods: {
    history$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};
//
// createMicroservice({
//   // debug: true,
//   seedAddress: 'seed',
//   address: 'chartService',
//   services: [
//     {
//       definition: chartServiceDefinition,
//       reference: ({ createProxy }) => {
//         const remoteService = createProxy({ serviceDefinition: remoteServiceDefinition });
//
//         const subject = new ReplaySubject(1);
//         const data = [['time [second]']];
//         let count = 0;
//         remoteService
//           .assets$()
//           .pipe(take(200), toArray(), repeat())
//           .subscribe((assets) => {
//             assets = assets.slice(1, 5);
//             if (count === 0) {
//               assets.forEach((asset) => {
//                 data[0].push(asset.id + '');
//               });
//             }
//
//             count++;
//             const prices = assets.reduce(
//               (arr, asset) => {
//                 arr.push(asset.price);
//                 return arr;
//               },
//               [count]
//             );
//             data.push(prices);
//
//             // console.log('history$', data);
//
//             subject.next(data);
//           });
//
//         subject.subscribe();
//         return {
//           history$: () => {
//             return subject.asObservable();
//           },
//         };
//       },
//     },
//   ],
// });
