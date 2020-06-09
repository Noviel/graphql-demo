import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { gql } from 'apollo-boost';

import { USERS_LIST } from 'src/queries';
import { User } from 'types';
import { useDeleteUser } from 'src/hooks/useDeleteUser';

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
  user: User;
  onShowUserDetails(id: string): void;
  onShowUserEdit(id: string): void;
};

export const UsersListItem = ({ user, onShowUserDetails, onShowUserEdit }: UsersListItemProps) => {
  const classes = useStyles();
  const { id, name, email } = user;

  const { deleteUserClickHandler } = useDeleteUser(id);

  function showUserDetails() {
    onShowUserDetails(id);
  }

  function showUserEdit(e: React.MouseEvent<HTMLButtonElement>) {
    console.log('show user', id);
    onShowUserEdit(id);
  }

  const DELETE_BUTTON_LABEL = 'Delete';
  const EDIT_BUTTON_LABEL = 'Edit';

  return (
    <TableRow className={classes.root}>
      <TableCell onClick={showUserDetails}>{id}</TableCell>
      <TableCell onClick={showUserDetails}>{name}</TableCell>
      <TableCell onClick={showUserDetails}>{email}</TableCell>
      <TableCell>
        <Box ml="auto" display="flex" justifyContent="flex-end">
          <Box mr={0.5}>
            <IconButton onClick={showUserEdit} aria-label={EDIT_BUTTON_LABEL} color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <IconButton
            onClick={deleteUserClickHandler}
            aria-label={DELETE_BUTTON_LABEL}
            className={classes.dangerButton}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};
