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
import { CreateUserPanel } from './CreateUserPanel';
import { UsersListItem } from './UsersListItem';
import { EditUserPanel } from './EditUserPanel';
import { UserDetails } from './UserDetailsPanel';

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
  const [isUserDetailsOpen, setUserDetailsOpen] = useState(false);

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
    setUserDetailsOpen(true);
  };

  const closeUserDetails = () => {
    setSelectedUserId(null);
    setUserDetailsOpen(false);
  };

  if (loading) {
    return (
      <p>
        Application is using free <a href="https://heroku.com">Heroku</a> plan for a server. It may take a while to wake
        it up.
      </p>
    );
  }
  if (error) {
    return <p>Something went wrong :(</p>;
  }

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
        <Table className={classes.table} aria-label="users table">
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
        {data.users.length === 0 && (
          <Box display="flex" justifyContent="center" width="100%" p={3}>
            <Typography>No users was found</Typography>
          </Box>
        )}
      </TableContainer>
      <CreateUserPanel open={isCreateUserDialogOpen} onClose={closeCreateUserDialog} />
      {selectedUserId && (
        <EditUserPanel userId={selectedUserId} open={isEditUserDialogOpen} onClose={closeUserEditDialog} />
      )}
      {selectedUserId && <UserDetails userId={selectedUserId} open={isUserDetailsOpen} onClose={closeUserDetails} />}
    </Box>
  );
};
