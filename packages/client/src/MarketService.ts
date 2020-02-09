import { createMicroservice, ASYNC_MODEL_TYPES } from '@scalecube/browser';
import { remoteServiceDefinition } from './services';
import { of, timer, Subject, ReplaySubject } from 'rxjs';
import { map, filter, tap, switchMap, take, delay, toArray } from 'rxjs/operators';

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
        const assets: any = {};
        const remoteService = createProxy({ serviceDefinition: remoteServiceDefinition });
        remoteService.assets$().subscribe((i: any) => {
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
          asset$: (id: string) => {
            let lastTick: string;
            return ticks.pipe(
              map(() => {
                return assets[id];
              }),
              filter((i: any) => i.lastUpdate != lastTick),
              tap((i: any) => (lastTick = i.lastUpdate))
            );
          },
        };
      },
    },
  ],
});
