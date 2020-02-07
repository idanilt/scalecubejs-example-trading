import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const AssetFeed = () => {
  const price = 1;
  const lastUpdate = 0;

  useEffect(() => {});

  return (
    <>
      <td>{price}</td>
      <td>{lastUpdate}</td>
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
        <AssetFeed />
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
