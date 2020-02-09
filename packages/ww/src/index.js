import { createMicroservice, ASYNC_MODEL_TYPES } from '@scalecube/browser';
import { of, timer, Subject, ReplaySubject } from 'rxjs';
import { map, filter, tap, switchMap, take, delay, toArray } from 'rxjs/operators';

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
