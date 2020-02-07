import { Asset } from './Asset';
import React, { useEffect } from 'react';

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

export const Assets = () => {
  useEffect(() => {});
  const assets = [
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
    {
      id: '1',
      name: 'appl',
      price: 1.677,
      lastUpdate: '1/2/3 00:00:23',
      type: 'currency',
    },
  ];

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
        {assets.map((i) => (
          <Asset key={i.id} price={i.price} id={i.id} type={i.type} lastUpdate={i.lastUpdate} />
        ))}
      </tbody>
    </table>
  );
};
