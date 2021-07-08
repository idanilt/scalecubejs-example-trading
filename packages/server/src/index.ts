import { from, interval, Observable, Subject } from 'rxjs';
import { ASYNC_MODEL_TYPES, createMicroservice } from '@scalecube/browser';
import { filter, map, switchMap } from 'rxjs/operators';

const remoteServiceDefinition = {
  serviceName: 'remoteService',
  methods: {
    assets$: {
      asyncModel: ASYNC_MODEL_TYPES.REQUEST_STREAM,
    },
  },
};

interface AssetData {
  id: string;
  assetName: string;
  price: number;
  lastUpdate: number;
  type: string;
}

const userStatus = new Subject();
const userBalance = new Subject();

const user = () => {
  const name = 'testUser';

  let balance = 1000;
  let isLogged = true;

  userStatus.subscribe((status: boolean) => {
    isLogged = status;
  });

  userBalance.subscribe((newBalance: number) => {
    balance = newBalance;
  });

  return {
    name,
    balance,
    isLogged,
  };
};

let orderId = 1;
const orders = {};
const login = () => userStatus.next(true);
const logout = () => userStatus.next(false);

const u = user();

const balance$ = () =>
  new Observable((obs) => {
    userBalance.subscribe((newBalance: number) => {
      if (u.isLogged) {
        obs.next(newBalance);
      }
    });
    userStatus.subscribe((status: boolean) => {
      if (status) {
        obs.next(u.balance);
      }
    });
  });

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

const getAllAssets = (n) => {
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

export const assets$ = () =>
  interval(1000).pipe(
    switchMap(() =>
      from(assets).pipe(
        map((assets: AssetData) => {
          const random = Math.random();
          assets.price = random >= 0.5 ? assets.price + random : assets.price - random;
          assets.lastUpdate = Date.now();
          return assets;
        })
      )
    )
  );

const createAsset = (assetId, assetType) => {
  return {
    id: assetId,
    assetName:
      assetType === 'Stock'
        ? ['AAPL', 'GOOGL', 'FB', 'TSLA', 'MSFT'][Math.floor(Math.random() * 4)]
        : ['EUR', 'USD', 'GBP', 'NIS', 'AUD'][Math.floor(Math.random() * 4)],
    price: Math.random() * 10,
    lastUpdate: Date.now(),
    type: assetType,
  };
};

createMicroservice({
  address: 'remoteService',
  seedAddress: 'seed',
  services: [
    {
      reference: {
        balance$,
        login,
        logout,
        placeOrder,
        cancelOrder,
        assets$,
        pendingOrders$,
      },
      definition: remoteServiceDefinition,
    },
  ],
});

export { remoteServiceDefinition };
