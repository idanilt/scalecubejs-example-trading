import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { userService } from '../services';

export const Auth = () => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const sub = userService.currentStatus$().subscribe((currentStatus: any) => {
      setStatus(currentStatus);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <Button color="inherit" onClick={() => (status ? userService.logout() : userService.login())}>
      {status ? 'Logout' : 'Login'}
    </Button>
  );
};
