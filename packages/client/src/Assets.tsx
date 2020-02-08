import { Asset } from './Asset';
import React, { useEffect, useState } from 'react';
import { toArray, take } from 'rxjs/operators';
import { marketService } from './marketServiceProxy';

export const Assets = () => {
  const [assets, setAsset] = useState<any>([]);

  useEffect(() => {
    const sub = marketService
      .assets$()
      .pipe(take(200), toArray())
      .subscribe((i: any) => setAsset(i));
    return () => {
      sub.unsubscribe();
    };
  });

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
