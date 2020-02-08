import { createMicroservice, ASYNC_MODEL_TYPES } from '@scalecube/browser';
import { remoteServiceDefinition } from './services';
import { from, timer } from 'rxjs';
import { map } from 'rxjs/operators';

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
        const assets: any = {};
        const remoteService = createProxy({ serviceDefinition: remoteServiceDefinition });
        remoteService.assets$().subscribe((i: any) => {
          assets[i.id] = i;
        });

        return {
          assets$: () => {
            return from(
              Object.keys(assets).map((k) => ({
                id: assets[k].id,
                name: assets[k].name,
                type: assets[k].type,
              }))
            );
          },
          asset$: (id: string) =>
            timer(0, 1000).pipe(
              map(() => {
                return assets[id];
              })
            ),
        };
      },
    },
  ],
});
