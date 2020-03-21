import { TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { userService } from '../services';

export const Balance = () => {
  const [status, setStatus] = useState(false);
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    const subStatus = userService.currentStatus$().subscribe((currentStatus: any) => {
      setStatus(currentStatus);
    });

    const subBalance = userService.balance$().subscribe((val: any) => {
      setBalance(val);
    });

    return () => {
      subStatus.unsubscribe();
      subBalance.unsubscribe();
    };
  }, []);

  return status ? (
    <TextField InputLabelProps={{ shrink: true }} id="standard-select-currency" disabled={true} value={balance} />
  ) : null;
};
