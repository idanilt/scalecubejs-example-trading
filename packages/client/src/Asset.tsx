import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { marketService } from './marketServiceProxy';

const AssetFeed = (props: any) => {
  // const [state, setState] = useState<any>({ price: '', lastUpdate: '' });
  // const price = 1;
  // const lastUpdate = 0;
  //
  // useEffect(() => {
  //   const sub = marketService
  //     .asset$(props.assetId)
  //     .subscribe(({ price, lastUpdate }: any) => {
  //       // console.log('AssetFeed', { price, lastUpdate })
  //       setState({ price, lastUpdate })
  //     });
  //
  //   return () => {
  //     console.log('AssetFeed unsubscribe', props.assetId)
  //     sub.unsubscribe();
  //   };
  // }, [props.assetId]);

  return (
    <>
      <td>{props.price}</td>
      <td>{props.lastUpdate}</td>
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
