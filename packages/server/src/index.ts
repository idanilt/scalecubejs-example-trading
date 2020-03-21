import { from, interval, Observable, ReplaySubject } from 'rxjs';
import { ASYNC_MODEL_TYPES, createMicroservice } from '@scalecube/browser';
import { filter, map, switchMap } from 'rxjs/operators';
import { remoteServiceDefinition } from '@scalecubejs-example-trading/api';

interface AssetData {
  id: string;
  name: string;
  price: number;
  lastUpdate: number;
  type: string;
}

const userStatus = new ReplaySubject(1);
const userBalance = new ReplaySubject(1);

const user = () => {
  const name = 'testUser';

  let balance = 1000;
  let isLogged = true;

  userStatus.subscribe((status: boolean) => {
    isLogged = status;
  });

  return {
    isLogged,
    name,
    balance,
  };
};
let orderId = 1;
const orders = {};
const u = user();

const login = () => {
  userStatus.next(true);
  userBalance.next(u.balance + '$');
  return Promise.resolve(u);
};

const logout = () => {
  userStatus.next(false);
  userBalance.next('0$');
  return Promise.resolve({});
};

const balance$ = () => userBalance.asObservable();
/*

const cancelOrder = ({ oId }) =>
  new Promise((resolve, reject) => {
    if (!u.isLogged) {
      reject('user not logged');
    }
    if (orders[oId]) {
      orders[oId] = null;
      resolve(`order ${oId} has been cancelled`);
    } else {
      reject(`order ${oId} has already finish to process`);
    }
  });

const pendingOrders$ = () =>
  interval(10).pipe(
    map(() => orders),
    filter(() => u.isLogged)
  );

const placeOrder = (order) =>
  new Promise((resolve, reject) => {
    if (!u.isLogged) {
      reject('user not logged');
    }
    const { price, amount } = order;

    const reduce = price * amount;
    if (u.balance - reduce > 0) {
      const oId = ++orderId;
      orders[oId] = { ...order, oId };
      userBalance.next(u.balance - reduce);
      const processTime = Math.floor(Math.random() * 10) + 1;
      // if order is cancelled before the process finish, retrieve the money
      setTimeout(() => {
        if (orders[oId]) {
          userBalance.next(u.balance + reduce);
        }
        orders[oId] = null;
      }, processTime * 1000);

      resolve({ oId });
    } else {
      reject('not enough money');
    }
  });
*/
const createAsset = (assetId: number, assetType: string) => {
  return {
    id: assetId,
    name:
      assetType === 'Stock'
        ? ['AAPL', 'GOOGL', 'FB', 'TSLA', 'MSFT'][Math.floor(Math.random() * 4)]
        : ['EUR', 'USD', 'GBP', 'NIS', 'AUD'][Math.floor(Math.random() * 4)],
    price: Math.floor(Math.random() * 10),
    lastUpdate: Date.now(),
    type: assetType,
  };
};

const getAllAssets = (n: number) => {
  const result: [] = [];
  for (let i = 0; i < n; i++) {
    // @ts-ignore
    result.push(createAsset(i, 'Stock'));
    // @ts-ignore
    result.push(createAsset(i + n, 'Currency'));
  }
  return result;
};

const assets = getAllAssets(200);

const assets$ = () =>
  interval(1000).pipe(
    switchMap(() =>
      from(assets).pipe(
        map((assets: AssetData) => {
          const randomPrefix = Math.random();
          const randomPrice = Math.random();
          assets.price = randomPrefix > 0.5 ? assets.price + randomPrice : assets.price - randomPrice;
          // console.log('assets.price', random)
          assets.lastUpdate = Date.now();
          return assets;
        })
      )
    )
  );

createMicroservice({
  seedAddress: 'seed',
  address: 'server',
  services: [
    {
      reference: {
        balance$,
        login,
        logout,
        // placeOrder,
        // cancelOrder,
        assets$,
        // pendingOrders$,
      },
      definition: remoteServiceDefinition,
    },
  ],
});

export { remoteServiceDefinition };
