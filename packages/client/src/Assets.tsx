import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Asset } from './Asset';
import React, { useEffect, useState } from 'react';
import { marketService } from './marketServiceProxy';
import { take, toArray } from 'rxjs/operators';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

let waitForAssets = 1;
export const Assets = () => {
  const [assets, setAsset] = useState<any>([]);

  useEffect(() => {
    const sub = marketService
      .assets$()
      .pipe(take(200), toArray(), take(1))
      .subscribe((i: any) => {
        if (i.length === 0) {
          waitForAssets++;
        }
        setAsset(i);
      });
    return () => {
      sub.unsubscribe();
    };
  }, [waitForAssets]);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Last</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets.map((i: any) => (
            <Asset key={i.id} price={i.price} id={i.id} type={i.type} lastUpdate={i.lastUpdate} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
