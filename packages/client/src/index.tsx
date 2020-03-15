import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './msSeed';
import { workers } from '@scalecube/browser';

async function init() {
  // @ts-ignore
  workers.initialize();
  let blob;
  blob = await fetch('http://localhost:2001/packages/server/dist/index.js').then((r) => r.blob());
  const serverWorker = new Worker(URL.createObjectURL(blob));
  // @ts-ignore
  workers.addWorker(serverWorker);

  blob = await fetch('http://localhost:2001/packages/ww/dist/index.js').then((r) => r.blob());
  const servicesWorker = new Worker(URL.createObjectURL(blob));
  // @ts-ignore
  workers.addWorker(servicesWorker);
}

init();

ReactDOM.render(<App />, document.getElementById('root'));
