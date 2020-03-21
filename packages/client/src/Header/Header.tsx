import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Auth } from '../Buttons/Auth';
import { Balance } from '../Labels/Balance';

// @ts-ignore
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Market
        </Typography>
        <Balance />
        <Auth />
      </Toolbar>
    </AppBar>
  );
};
