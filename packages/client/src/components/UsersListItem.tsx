import React, { useCallback } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import cx from 'clsx';

import { User } from '@graphql-demo/core/types';
import { useDeleteUser } from 'src/hooks/useDeleteUser';
import { useButtonClick } from 'src/hooks/useEventButtonClick';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dangerButton: {
      color: theme.palette.error.main,
    },
    clickableRow: {
      '&:hover': {
        backgroundColor: '#fafafa',
      },
    },
    clickableCell: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
    idCell: {
      [theme.breakpoints.down('sm')]: {
        maxWidth: 100,
        overflow: 'hidden',
      },
    },
  })
);

type UsersListItemProps = {
  user: User;
  onShowUserDetails(id: string): void;
  onShowUserEdit(id: string): void;
};

export const UsersListItem = ({ user, onShowUserDetails, onShowUserEdit }: UsersListItemProps) => {
  const { id, name, email } = user;

  const classes = useStyles();
  const [_, deleteUserClickHandler] = useDeleteUser(id);

  const showUserDetails = useCallback(() => {
    onShowUserDetails(id);
  }, []);

  const showUserEdit = useButtonClick(
    (e) => {
      onShowUserEdit(id);
    },
    [id]
  );

  return (
    <TableRow className={classes.clickableRow}>
      <TableCell className={cx(classes.clickableCell, classes.idCell)} onClick={showUserDetails}>
        {id}
      </TableCell>
      <TableCell className={cx(classes.clickableCell, classes.idCell)} onClick={showUserDetails}>
        {name}
      </TableCell>
      <TableCell className={cx(classes.clickableCell, classes.idCell)} onClick={showUserDetails}>
        {email}
      </TableCell>
      <TableCell>
        <Box ml="auto" display="flex" justifyContent="flex-end">
          <Box mr={0.5}>
            <IconButton onClick={showUserEdit} aria-label="Edit" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <IconButton onClick={deleteUserClickHandler} aria-label="Delete" className={classes.dangerButton}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};
