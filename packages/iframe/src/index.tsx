import * as React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';

import './chartService';
import { createMicroservice, ASYNC_MODEL_TYPES } from '@scalecube/browser';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

const chartServiceDefinition = {
  serviceName: 'chartService',
  methods: {
    history$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};

const chartService = createMicroservice({
  seedAddress: 'seed',
  address: 'iframeProxy',
}).createProxy({ serviceDefinition: chartServiceDefinition });

const App = () => {
  const [data, setData] = useState([]);

  const latestProps = useRef(data);
  useEffect(() => {
    latestProps.current = data;
  });

  useEffect(() => {
    const subscription = chartService.history$().subscribe((nextValue: any) => {
      // @ts-ignore
      setData(nextValue);
    });

    return subscription.unsubscribe;
  }, []);

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="Line"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        chart: {
          title: 'Market Service History',
          subtitle: '',
        },
      }}
      rootProps={{ 'data-testid': '3' }}
    />
  );
};

render(<App />, document.getElementById('iframe-root'));
