import { Asset } from './Asset';
import React, { useEffect, useState } from 'react';

import { createMicroservice, ASYNC_MODEL_TYPES } from '@scalecube/browser';

export const remoteServiceDefinition = {
  serviceName: 'remoteService',
  methods: {
    assets$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};

const microservice = createMicroservice({ seedAddress: 'seed' });

export const remoteService = microservice.createProxy({
  serviceDefinition: remoteServiceDefinition,
});

const used: any = {};
const cache: any = [];
export const Assets = () => {
  const [assets, setAsset] = useState<any>([]);

  useEffect(() => {
    const sub = remoteService.assets$().subscribe((i: any) => {
      if (used[i.id] === undefined) {
        used[i.id] = true;
        cache.push(i);
        //console.log(i)
      }
    });
    setTimeout(() => {
      setAsset(cache);
      sub.unsubscribe();
    }, 1100);
    return () => {
      sub.unsubscribe();
    };
  });

  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Last Update</th>
          <th>Type</th>
        </tr>
        {assets.map((i: any) => (
          <Asset key={i.id} price={i.price} id={i.id} type={i.type} lastUpdate={i.lastUpdate} />
        ))}
      </tbody>
    </table>
  );
};
