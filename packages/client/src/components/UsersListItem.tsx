import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { USERS_LIST } from 'src/queries';
import { User } from 'types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    dangerButton: {
      color: theme.palette.error.main,
    },
  })
);

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

type UsersListItemProps = {
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export const UsersListItem = ({ user }: UsersListItemProps) => {
  const classes = useStyles();
  const { id, name, email } = user;
  const [deleteUser, second] = useMutation(DELETE_USER, {
    variables: {
      id,
    },
    update(cache, { data: { deleteUser } }) {
      const { users } = cache.readQuery<{ users: User[] }>({ query: USERS_LIST });
      const index = users.findIndex((user) => user.id === id);

      cache.writeQuery({
        query: USERS_LIST,
        data: {
          users: [...users.slice(0, index), ...users.slice(index + 1)],
        },
      });
    },
  });

  const DELETE_BUTTON_LABEL = 'Удалить';
  const EDIT_BUTTON_LABEL = 'Редактировать';

  return (
    <TableRow className={classes.root}>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>
        <Box ml="auto" display="flex" justifyContent="space-between">
          <Box mr={0.5}>
            <IconButton aria-label={EDIT_BUTTON_LABEL} color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <IconButton onClick={(_) => deleteUser()} aria-label={DELETE_BUTTON_LABEL} className={classes.dangerButton}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};
