import { Asset } from './Asset';
import React, { useEffect, useState } from 'react';
import { marketService } from './marketServiceProxy';
import { take, toArray } from 'rxjs/operators';

export const Assets = () => {
  const [assets, setAsset] = useState<any>([]);

  useEffect(() => {
    marketService.assets$().then((assets: any) => setAsset(assets));
  }, []);

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
