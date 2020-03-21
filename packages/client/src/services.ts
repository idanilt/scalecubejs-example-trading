import { marketServiceDefinition, remoteServiceDefinition } from '@scalecubejs-example-trading/api';
import { getProxy } from './msSeed';
import { ReplaySubject, Observable } from 'rxjs';

export const marketService = getProxy({
  serviceDefinition: marketServiceDefinition,
});

export const userService = (() => {
  const status$ = new ReplaySubject(1);
  let status = false;
  status$.next(false);

  const remoteService = getProxy({ serviceDefinition: remoteServiceDefinition });
  return {
    login: () => {
      status = true;
      status$.next(true);
      return remoteService.login();
    },
    logout: () => {
      status = false;
      status$.next(false);
      return remoteService.logout();
    },
    currentStatus$: () => status$.asObservable(),
    balance$: () =>
      new Observable((obs) => {
        remoteService.balance$().subscribe((val: string) => {
          obs.next(val);
        });
      }),
  };
})();
