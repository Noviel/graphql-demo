import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';

import { USERS_LIST } from 'src/queries';
import { CreateUserDialog } from './CreateUserDialog';
import { UsersListItem } from './UsersListItem';
import { UserDetailsPanel } from './UserDetailsPanel';
import { EditUserDialog } from './EditUserForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    table: {
      minWidth: '700px',
      maxWidth: '60%',
    },
    addUserButton: {
      minWidth: '160px',
    },
  })
);

export const UsersList = () => {
  const { loading, error, data } = useQuery(USERS_LIST);
  const classes = useStyles();

  const [isCreateUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setEditUserDialogOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const closeCreateUserDialog = () => {
    setCreateUserDialogOpen(false);
  };

  const openCreateUserDialog = () => {
    setCreateUserDialogOpen(true);
  };

  const closeUserEditDialog = () => {
    setEditUserDialogOpen(false);
    setSelectedUserId(null);
  };

  const openUserEditDialog = (id: string) => {
    setEditUserDialogOpen(true);
    setSelectedUserId(id);
  };

  const showUserDetails = (id: string) => {
    setSelectedUserId(id);
  };

  const hideUserDetails = () => {
    setSelectedUserId(null);
  };

  if (loading) {
    return (
      <p>
        Application is using free <a href="https://heroku.com">Heroku for a server</a> plan. It may take a while to wake
        it up.
      </p>
    );
  }
  if (error) {
    return <p>Something went wrong :(</p>;
  }

  const TABLE_LABEL = 'Users table';

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" pb={3}>
        <Typography variant="h4" component="h1">
          Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.addUserButton}
          onClick={openCreateUserDialog}
          startIcon={<AddIcon />}
        >
          New User
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={4}>
        <Table className={classes.table} aria-label={TABLE_LABEL}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((user) => {
              return (
                <UsersListItem
                  key={user.id}
                  user={user}
                  onShowUserDetails={showUserDetails}
                  onShowUserEdit={openUserEditDialog}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateUserDialog open={isCreateUserDialogOpen} onClose={closeCreateUserDialog} />
      {selectedUserId && (
        <EditUserDialog userId={selectedUserId} open={isEditUserDialogOpen} onClose={closeUserEditDialog} />
      )}
    </Box>
  );
};
