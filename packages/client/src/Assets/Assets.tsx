import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Asset } from './Asset';
import React, { useEffect, useRef, useState } from 'react';
import { marketService } from '../marketServiceProxy';

import { workers } from '@scalecube/browser';

const useStyles = makeStyles({
  table: {
    maxHeight: '400px',
    width: '100%',
  },
  sticky: {
    backgroundColor: '#B0CEFF',
    position: 'sticky',
    top: 0,
  },
});

const addIframe = () => {
  const iframe = document.getElementById('charts');
  if (iframe) {
    // @ts-ignore
    iframe.src = 'http://localhost:1111/index.html';
    // @ts-ignore
    workers.addIframe(iframe);
  }
};

export const Assets = () => {
  const [assets, setAsset] = useState<any>([]);

  const latestProps = useRef(assets);
  useEffect(() => {
    latestProps.current = assets;
  });

  useEffect(() => {
    const subscription = marketService.assets$().then((assets: any) => setAsset(assets));
    addIframe();
    return subscription.unsubscribe;
  }, []);

  const classes = useStyles();
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.sticky}>Id</TableCell>
            <TableCell className={classes.sticky}>Name</TableCell>
            <TableCell className={classes.sticky}>Price</TableCell>
            <TableCell className={classes.sticky}>Last</TableCell>
            <TableCell className={classes.sticky}>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((i: any) => (
            <Asset key={i.id} price={i.price} id={i.id} name={i.name} type={i.type} lastUpdate={i.lastUpdate} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
