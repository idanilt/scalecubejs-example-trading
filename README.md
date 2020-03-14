# scalecubejs-example-trading

Scalecubejs example trading app

### loading the iframe

cd packages/iframe

- build: `parcel build src/index.tsx`
- run: `http-server -a localhost -p 1111`

### loading the client and Webworker

cd packages/client

- build: `parcel build src/index.tsx`

cd packages/ww

- build: `parcel build src/index.js`

run from root: `http-server -a localhost -p 2001`
