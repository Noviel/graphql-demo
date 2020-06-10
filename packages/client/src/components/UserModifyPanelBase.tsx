import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Divider } from '@material-ui/core';

import { ButtonClickEvent, InputChangeEvent, FormSubmitEvent } from 'src/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    content: {
      minWidth: 420,
    },
    actions: {
      paddingRight: theme.spacing(3),
    },
    createButton: {
      minWidth: 150,
    },
    deleteButton: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.light,

      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
  })
);

interface UserDetailsPanelBaseProps {
  userId?: string;
  userName: string;
  userEmail: string;

  onChangeName?: InputChangeEvent;
  onChangeEmail?: InputChangeEvent;
  onDelete?: ButtonClickEvent;

  submit: FormSubmitEvent;
  loading: boolean;

  open: boolean;
  onClose(): void;

  actionText: string;
}

export const UserDetailsPanelBase = ({
  userId,
  userName,
  userEmail,

  onChangeName,
  onChangeEmail,
  onDelete,

  submit,
  loading,

  onClose,
  open,

  actionText,
}: UserDetailsPanelBaseProps) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="create-user-dialog-title" maxWidth="xl">
      <Box className={classes.root}>
        <DialogTitle id="edit-user-dialog-title">Edit user</DialogTitle>
        <Divider />
        <form noValidate onSubmit={submit}>
          <DialogContent className={classes.content}>
            {userId && (
              <TextField
                variant="outlined"
                margin="normal"
                autoFocus
                id="user-id"
                label="Id"
                type="text"
                fullWidth
                value={userId}
                disabled
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              autoFocus
              id="user-name"
              label="Name"
              type="text"
              fullWidth
              value={userName}
              onChange={onChangeName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              id="user-email"
              label="Email"
              type="email"
              fullWidth
              value={userEmail}
              onChange={onChangeEmail}
            />
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button onClick={onClose} color="primary" variant="outlined">
              Cancel
            </Button>
            {onDelete && (
              <Button
                color="primary"
                variant="contained"
                className={classes.deleteButton}
                type="button"
                onClick={onDelete}
              >
                Delete
              </Button>
            )}
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={loading}
              className={classes.createButton}
            >
              {loading ? '...' : actionText}
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
};
