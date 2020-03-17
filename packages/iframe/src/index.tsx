import * as React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import { chartServiceDefinition } from '@scalecubejs-example-trading/api';
import { createMicroservice } from '@scalecube/browser';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

const chartService = createMicroservice({
  seedAddress: 'seed',
  address: 'iframeChart',
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

  // console.log(data)
  return data.length <= 3 ? null : (
    <Chart
      width={'100%'}
      height={'280px'}
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
