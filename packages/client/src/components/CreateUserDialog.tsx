import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import { User } from 'types';
import { Divider } from '@material-ui/core';
import { USERS_LIST } from 'src/queries';

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
  })
);

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

type CreateUserDialogProps = {
  open: boolean;
  onClose(): void;
};

export const CreateUserDialog = ({ open, onClose }: CreateUserDialogProps) => {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [createUser, { data, loading }] = useMutation(CREATE_USER, {
    variables: {
      input: {
        name,
        email,
      },
    },
    update(cache, { data: { createUser } }) {
      const { users } = cache.readQuery<{ users: User[] }>({ query: USERS_LIST });

      cache.writeQuery({
        query: USERS_LIST,
        data: {
          users: users.concat(createUser),
        },
      });
    },
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await createUser();
    onClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="create-user-dialog-title" maxWidth="xl">
        <Box className={classes.root}>
          <DialogTitle id="create-user-dialog-title">Create new user</DialogTitle>
          <Divider />
          <form noValidate onSubmit={submit}>
            <DialogContent className={classes.content}>
              <TextField
                variant="outlined"
                margin="normal"
                autoFocus
                id="name"
                label="Name"
                type="text"
                fullWidth
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="email"
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
            </DialogContent>
            <DialogActions className={classes.actions}>
              <Button onClick={onClose} color="primary" variant="outlined">
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={loading}
                className={classes.createButton}
              >
                {loading ? 'Creating...' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};
