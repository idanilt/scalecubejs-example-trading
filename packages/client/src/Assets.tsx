import { Asset } from './Asset';
import React, { useEffect, useState } from 'react';
import { marketService } from './marketServiceProxy';
import { take, toArray } from 'rxjs/operators';

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

  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Last Update</th>
          <th>Type</th>
        </tr>
        {assets.map((i: any) => (
          <Asset key={i.id} price={i.price} id={i.id} type={i.type} lastUpdate={i.lastUpdate} />
        ))}
      </tbody>
    </table>
  );
};
