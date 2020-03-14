import * as React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';

// import './chartService';
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

debugger;
const chartService = createMicroservice({
  seedAddress: 'seed',
  address: 'iframeProxy',
  services: [
    {
      definition: {
        serviceName: 'iframeService',
        methods: {
          test: {
            asyncModel: ASYNC_MODEL_TYPES.REQUEST_RESPONSE,
          },
        },
      },
      reference: {
        test: () => Promise.resolve({}),
      },
    },
  ],
  debug: true,
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
      height={'380px'}
      chartType="Line"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        chart: {
          title: 'Market Service History',
          subtitle: '',
        },
      }}
    />
  );
};

render(<App />, document.getElementById('iframe-root'));
