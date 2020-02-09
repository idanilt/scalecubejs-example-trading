import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Assets } from './Assets';

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
}));

function App() {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Market
          </Typography>
          <Button color="inherit" className={classes.btn} onClick={() => setIsLogin(!isLogin)}>
            {!isLogin ? 'Login' : 'Logout'}
          </Button>
        </Toolbar>
      </AppBar>
      {isLogin ? <Assets /> : null}
    </div>
  );
}

export default App;
