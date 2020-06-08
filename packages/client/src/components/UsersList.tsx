import React from 'react';
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

import { USERS_LIST } from 'src/queries';

import { UsersListItem } from './UsersListItem';
import Box from '@material-ui/core/Box';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const TABLE_LABEL = 'Users table';

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" pb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Users
        </Typography>
        <Button variant="contained" color="primary" className={classes.addUserButton}>
          New User
        </Button>
      </Box>
      <TableContainer component={Paper} elevation={4}>
        <Table className={classes.table} aria-label={TABLE_LABEL}>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>email</TableCell>
              <TableCell align="center">controls</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((user) => {
              return <UsersListItem key={user.id} user={user} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
