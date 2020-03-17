import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Assets } from './Assets/Assets';

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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Market
          </Typography>
        </Toolbar>
      </AppBar>
      <iframe id="charts" width="100%" height="300px" className={classes.chart}></iframe>
      <Assets />
    </div>
  );
}

export default App;
