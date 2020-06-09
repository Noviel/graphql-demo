import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import { User } from 'types';
import { Divider } from '@material-ui/core';
import { USERS_LIST } from 'src/queries';
import { useDeleteUser } from 'hooks/useDeleteUser';
import { useButtonClick } from 'src/hooks/useEventButtonClick';

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

const EDIT_USER = gql`
  mutation EditUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

const GET_USER_DETAILS = gql`
  query GetUserDetails($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

type EditUserDialogProps = {
  userId: string;
  open: boolean;
  onClose(): void;
};

export const EditUserDialog = ({ userId, open, onClose }: EditUserDialogProps) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { data, loading: loadingDetails } = useQuery<{ user: User }>(GET_USER_DETAILS, {
    variables: {
      id: userId,
    },
  });

  const [editUser] = useMutation(EDIT_USER, {
    variables: {
      id: userId,
      input: {
        name,
        email,
      },
    },
  });

  console.log(userId, data);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const { deleteUser } = useDeleteUser(data?.user.id);

  React.useEffect(() => {
    if (!data) {
      return;
    }
    setName(data.user.name);
    setEmail(data.user.email);
  }, [data]);

  // const [createUser, { data, loading }] = useMutation(CREATE_USER, {
  //   variables: {
  //     input: {
  //       name,
  //       email,
  //     },
  //   },
  //   update(cache, { data: { createUser } }) {
  //     const { users } = cache.readQuery<{ users: User[] }>({ query: USERS_LIST });

  //     cache.writeQuery({
  //       query: USERS_LIST,
  //       data: {
  //         users: users.concat(createUser),
  //       },
  //     });
  //   },
  // });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    editUser();
    // const result = await createUser();
    onClose();
  }

  const handleDeleteUser = useButtonClick(() => {
    deleteUser();
    onClose();
  }, [deleteUser, onClose]);

  if (loadingDetails) {
    return null;
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="create-user-dialog-title" maxWidth="xl">
        <Box className={classes.root}>
          <DialogTitle id="edit-user-dialog-title">Edit user</DialogTitle>
          <Divider />
          <form noValidate onSubmit={submit}>
            <DialogContent className={classes.content}>
              <TextField
                variant="outlined"
                margin="normal"
                autoFocus
                id="user-id"
                label="Id"
                type="text"
                fullWidth
                value={data?.user.id}
                disabled
              />
              <TextField
                variant="outlined"
                margin="normal"
                autoFocus
                id="user-name"
                label="Name"
                type="text"
                fullWidth
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="user-email"
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
                className={classes.deleteButton}
                type="button"
                onClick={handleDeleteUser}
              >
                Delete
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={false}
                className={classes.createButton}
              >
                {false ? 'Saving...' : 'Save'}
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};
