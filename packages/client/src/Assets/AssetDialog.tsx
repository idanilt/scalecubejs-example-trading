import React, { useState, useEffect } from 'react';
import { DialogTitle } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import { marketService } from '../services';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { userService } from '../services';

export const AssetDialog = () => {
  const [open, setOpen] = useState(false);
  const [asset, setAsset] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let assetSub: any;
    let statusSub: any;
    const subscriber = marketService.getAssetDetail$().subscribe((id: any) => {
      if (id !== null) {
        setOpen(true);
        assetSub = marketService.asset$(id).subscribe((data: any) => {
          setAsset(data);
        });
      } else {
        setOpen(false);
        statusSub && statusSub.unsubscribe();
        assetSub && assetSub.unsubscribe();
      }

      statusSub = userService.currentStatus$().subscribe((status: any) => {
        setIsLogin(status);
      });
    });
    return () => {
      subscriber.unsubscribe();
      statusSub && statusSub.unsubscribe();
      assetSub && assetSub.unsubscribe();
    };
  }, []);

  const close = () => {
    marketService.setAssetDetail(null);
  };

  if (asset === null) {
    return null;
  } else {
    const { id, name, price, type, lastUpdte } = asset;
    return (
      <Dialog onClose={close} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Asset {name}</DialogTitle>
        <DialogContent>
          <DialogContentText>Asset Details:</DialogContentText>
          <TextField disabled fullWidth id="id" label="Id" value={id} />
          <TextField disabled fullWidth id="name" label="Name" value={name} />
          <TextField disabled fullWidth id="price" label="price" value={price} />
          <TextField disabled fullWidth id="Type" label="type" value={type} />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Close
          </Button>
          {isLogin ? (
            <Button onClick={close} color="primary">
              Buy
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    );
  }
};
