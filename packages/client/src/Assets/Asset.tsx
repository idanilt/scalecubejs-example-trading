import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { marketService } from '../marketServiceProxy';
import { TableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';

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
      <TableCell>{state.price}</TableCell>
      <TableCell>{state.lastUpdate}</TableCell>
    </>
  );
};

export const Asset = (props: any) => {
  const { id, name, type } = props;
  const [ref, inView] = useInView({
    threshold: 0,
  });

  marketService.setAssetsInView({ id, inView });
  return (
    <TableRow key={id} ref={ref}>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      {inView ? (
        <AssetFeed {...props} />
      ) : (
        <>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </>
      )}
      <TableCell>{type}</TableCell>
    </TableRow>
  );
};
