import './services';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import './MarketService';

import { workers } from '@scalecube/browser';
async function init() {
  workers.initialize();
  let blob = await fetch('http://localhost:1234/index.js').then((r) => r.blob());
  const worker = new Worker(URL.createObjectURL(blob));
  workers.addWorker(worker);
}
init();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//import('http://localhost:1234/index.js');
