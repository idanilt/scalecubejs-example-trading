import { createMicroservice, ASYNC_MODEL_TYPES } from '@scalecube/browser';
import { remoteServiceDefinition } from './services';
import { from, interval, Observable } from 'rxjs';
import { map, switchMap, take, toArray } from 'rxjs/operators';
import { filter } from 'minimatch';

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
createMicroservice({
  seedAddress: 'seed',
  address: 'marketService',
  debug: true,
  services: [
    {
      definition: MarketServiceDefinition,
      reference: ({ createProxy }) => {
        const remoteService = createProxy({ serviceDefinition: remoteServiceDefinition });
        const assets$ = remoteService.assets$().pipe(
          take(200),
          toArray(),
          // @ts-ignore
          map((assets) =>
            assets.reduce((acc: any[], asset: any) => {
              acc[asset.id] = asset;
              return acc;
            }, [])
          )
        );

        return {
          assets$: () => {
            return assets$;
          },
          asset$: (id: string) => {
            return new Observable((obs) => {
              assets$.subscribe({
                next: (assets: any) => obs.next(assets[id]),
                error: (err: any) => obs.error(err),
                complete: () => obs.complete(),
              });
            });
          },
        };
      },
    },
  ],
});
