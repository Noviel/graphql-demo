import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Button, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

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
      paddingBottom: theme.spacing(2),
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

const USER_DETAILS = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

type UserDetailsProps = {
  userId: string;
  open: boolean;
  onClose(): void;
};

export const UserDetails = ({ userId, onClose, open }: UserDetailsProps) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(USER_DETAILS, {
    variables: {
      id: userId,
    },
  });

  if (error) return <p>Error :(</p>;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="user-details-title" maxWidth="xl">
      <DialogTitle id="user-details-title">User details</DialogTitle>
      <DialogContent className={classes.content}>
        {loading ? (
          'loading'
        ) : (
          <>
            <DialogContentText>
              <Typography variant="body1" color="textSecondary">
                Id
              </Typography>
              <Typography variant="body2">{userId}</Typography>
            </DialogContentText>
            <DialogContentText>
              <Typography variant="body1" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body2">{data.user.name}</Typography>
            </DialogContentText>
            <DialogContentText>
              <Typography variant="body1" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body2">{data.user.email}</Typography>
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
