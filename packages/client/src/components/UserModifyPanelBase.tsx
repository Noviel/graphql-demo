import React, { useState } from 'react';

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
import { isEmail } from '@graphql-demo/core/src/email';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    content: {
      minWidth: 420,
      [theme.breakpoints.down('md')]: {
        minWidth: 'unset',
      },
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
  title: string;
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
  title,
}: UserDetailsPanelBaseProps) => {
  const classes = useStyles();

  const isValidName = userName.length > 0;
  const isValidEmail = isEmail(userEmail);

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const displayNameError = isNameTouched && !isValidName;
  const displayEmailError = isEmailTouched && !isValidEmail;

  const close = () => {
    setIsNameTouched(false);
    setIsEmailTouched(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={close} aria-labelledby="user-dialog-title" maxWidth="xl">
      <Box className={classes.root}>
        <DialogTitle id="user-dialog-title">{title}</DialogTitle>
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
              error={displayNameError}
              helperText={displayNameError && 'Name is required'}
              onBlur={(e) => {
                setIsNameTouched(true);
              }}
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
              error={displayEmailError}
              helperText={displayEmailError && 'Incorrect email format'}
              onBlur={(e) => {
                setIsEmailTouched(true);
              }}
            />
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button onClick={close} color="primary" variant="outlined">
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
              disabled={loading || !isValidEmail || !isValidName}
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
