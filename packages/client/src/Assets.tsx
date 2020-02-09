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
    marketService.assets$().then((assets: any) => setAsset(assets));
  }, []);

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
