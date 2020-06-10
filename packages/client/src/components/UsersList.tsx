import React, { memo } from 'react';
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
import { UsersListItem } from './UsersListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    table: {
      minWidth: '700px',
      maxWidth: '60%',
      [theme.breakpoints.down('sm')]: {
        minWidth: '300px',
        maxWidth: '100vw',
      },
    },
    addUserButton: {
      minWidth: '160px',
    },
    idCell: {
      [theme.breakpoints.down('sm')]: {
        maxWidth: 100,
        width: '100px',
        overflow: 'hidden',
      },
    },
  })
);

interface UserListProps {
  openUserCreate(): void;
  openUserEdit(id: string): void;
  openUserDetails(id: string): void;
}

export const UsersList = memo(({ openUserCreate, openUserEdit, openUserDetails }: UserListProps) => {
  const { loading, error, data } = useQuery(USERS_LIST);
  const classes = useStyles();

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
          onClick={openUserCreate}
          startIcon={<AddIcon />}
        >
          New User
        </Button>
      </Box>
      <TableContainer className={classes.table} component={Paper} elevation={4}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.idCell}>Id</TableCell>
              <TableCell className={classes.idCell}>Name</TableCell>
              <TableCell className={classes.idCell}>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((user) => {
              return (
                <UsersListItem
                  key={user.id}
                  user={user}
                  onShowUserDetails={openUserDetails}
                  onShowUserEdit={openUserEdit}
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
    </Box>
  );
});

UsersList.displayName = 'UsersList';
