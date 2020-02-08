import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { marketService } from './marketServiceProxy';

const AssetFeed = (props: any) => {
  const [state, setState] = useState<any>({ price: '', lastUpdate: '' });
  useEffect(() => {
    const sub = marketService.asset$(props.id).subscribe(setState);

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
        <AssetFeed {...props} />
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
