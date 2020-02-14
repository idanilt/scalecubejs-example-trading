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

const useStyles = makeStyles({
  table: {},
});

let waitForAssets = 1;
export const Assets = () => {
  const [assets, setAsset] = useState<any>([]);

  useEffect(() => {
    marketService.assets$().then((assets: any) => setAsset(assets));
  }, []);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Last</TableCell>
            <TableCell>Type</TableCell>
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
