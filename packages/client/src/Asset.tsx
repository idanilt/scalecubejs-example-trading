import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { marketService } from './marketServiceProxy';

const AssetFeed = (props: any) => {
  const [state, setState] = useState<any>({ price: '', lastUpdate: '' });
  const price = 1;
  const lastUpdate = 0;

  useEffect(() => {
    console.log(props);
    const sub = marketService
      .asset$(props.assetId)
      .subscribe(({ price, lastUpdate }: any) => setState({ price, lastUpdate }));

    return () => {
      sub.unsubscribe();
    };
  }, [props.assetId]);

  return (
    <>
      <td>{state.price}</td>
      <td>{state.lastUpdate}</td>
    </>
  );
};

export const Asset = (props: any) => {
  const { id, name, type } = props;
  const [ref, inView] = useInView({
    threshold: 0,
  });

  return (
    <tr key={id} ref={ref}>
      <td>{id}</td>
      <td>{name}</td>
      {inView ? (
        <AssetFeed assetId={id} />
      ) : (
        <>
          <td></td>
          <td></td>
        </>
      )}
      <td>{type}</td>
    </tr>
  );
};
