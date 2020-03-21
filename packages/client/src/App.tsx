import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Assets } from './Assets/Assets';
import { Header } from './Header/Header';
import { AssetDialog } from './Assets/AssetDialog';

// @ts-ignore
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  btn: {
    width: '100px',
  },
  chart: {
    marginBottom: '10px',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <AssetDialog />
      <iframe id="charts" width="100%" height="300px" className={classes.chart}></iframe>
      <Assets />
    </div>
  );
}

export default App;
