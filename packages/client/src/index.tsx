import './services';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { workers } from '@scalecube/browser';

async function init() {
  // @ts-ignore
  workers.initialize();
  let blob = await fetch('http://localhost:2001/packages/ww/dist/index.js').then((r) => r.blob());
  const worker = new Worker(URL.createObjectURL(blob));
  // @ts-ignore
  workers.addWorker(worker);
}

init();

ReactDOM.render(<App />, document.getElementById('root'));
