/*
    balance$(balanceRequest: BalanceRequest): Observable<BalanceEvent>;
    placeOrder(investRequest: InvestRequest): Promise<InvestResponse>;
    cancelOrder(sellRequest: SellRequest): Promise<SellResponse>;
    tradeActions$(tradeActionsRequest: TradeActionsRequest): Observable<TradeActionsEvent>;
 */

import { Observable, Subject } from "rxjs";

const userStatus = new Subject();
const userBalance = new Subject();

const user = () => {
  const name = "testUser";

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
    isLogged
  };
};

let orderId = 1;
const orders = {};
const login = () => userStatus.next(true);
const logout = () => userStatus.next(false);

const u = user();

const balance$ = () =>
  new Observable(obs => {
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
    if (orders[oId]) {
      orders[oId] = null;
      resolve(`order ${oId} has been cancelled`);
    } else {
      reject(`order ${oId} has already finish to process`);
    }
  });

const placeOrder = order =>
  new Promise((resolve, reject) => {
    if (!u.isLogged) {
      reject("user not logged");
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
      reject("not enough money");
    }
  });

const tradeActions$ = new Observable(obs => {
  // TODO random assets,
});
export { balance$, login, logout, placeOrder, cancelOrder, tradeActions$ };
