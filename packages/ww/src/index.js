import { createMicroservice, ASYNC_MODEL_TYPES } from '@scalecube/browser';
import { of, timer, Subject, ReplaySubject, Observable, interval } from 'rxjs';
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
    setAssetsInView: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
    getAssetsInView: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
    },
  },
};

createMicroservice({
  seedAddress: 'seed',
  address: 'marketService',
  // debug: true,
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

        const asssetsViewStatus = {};

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
          setAssetsInView: ({ id, inView }) => {
            asssetsViewStatus[id] = inView;
            return Promise.resolve();
          },
          getAssetsInView: () => {
            const currentAssetsStatus = { ...asssetsViewStatus };
            const assetsInView = Object.keys(currentAssetsStatus).filter((key) => currentAssetsStatus[key]);
            return Promise.resolve([...assetsInView]);
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

createMicroservice({
  // debug: true,
  seedAddress: 'seed',
  address: 'chartService',
  services: [
    {
      definition: chartServiceDefinition,
      reference: ({ createProxy }) => {
        const remoteService = createProxy({ serviceDefinition: remoteServiceDefinition });
        const marketService = createProxy({ serviceDefinition: MarketServiceDefinition });
        const subject = new ReplaySubject(1);
        const assets = {};
        remoteService.assets$().subscribe((asset) => {
          assets[asset.id] = [...(assets[asset.id] || []), asset];
        });

        interval(1000).subscribe(() => {
          subject.next({ ...assets });
        });
        return {
          history$: () =>
            new Observable((obs) => {
              subject.subscribe((currentAssets) => {
                marketService.getAssetsInView().then((assetsInView) => {
                  if (Object.keys(currentAssets).length === 0) {
                    return;
                  }
                  const data = [['time [second]', ...assetsInView]];
                  const chartData = currentAssets[0].map((val, timestampIndex) => [
                    timeConverter(new Date(val.lastUpdate)),
                    ...assetsInView.map((id) => currentAssets[id][timestampIndex].price),
                  ]);

                  data.push(...chartData);
                  // console.log('1111111', data)

                  obs.next(data);
                });
              });
            }),
        };
      },
    },
  ],
});

const timeConverter = (unixTime) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = unixTime.getFullYear();
  const month = months[unixTime.getMonth()];
  const date = unixTime.getDate();
  const hour = unixTime.getHours();
  const min = unixTime.getMinutes();
  const sec = unixTime.getSeconds();
  const time = `${date}.${month}-${hour}:${min}:${sec}`;

  return time;
};
