import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { workers } from '@scalecube/browser';
import './services';

import './MarketService';
// import './chartService';

//import('http://localhost:1234/index.js');
async function init() {
  // @ts-ignore
  workers.initialize();
  // let blob = await fetch('http://localhost:1234/index.js').then((r) => r.blob());
  // const worker = new Worker(URL.createObjectURL(blob));
  // @ts-ignore
  // workers.addWorker(worker);

  const iframe = document.getElementById('charts');

  // @ts-ignore
  workers.addIframe(iframe);
}

init();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
