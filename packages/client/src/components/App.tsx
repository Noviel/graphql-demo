import React, { useState, useCallback } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { UsersList } from './UsersList';
import { CreateUserPanel } from './CreateUserPanel';
import { EditUserPanel } from './EditUserPanel';
import { UserDetailsPanel } from './UserDetailsPanel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2),
    },
  })
);

export function App() {
  const classes = useStyles();
  const [isCreateUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [isUserDetailsOpen, setUserDetailsOpen] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const closeUserCreate = useCallback(() => {
    setCreateUserDialogOpen(false);
  }, []);

  const openUserCreate = useCallback(() => {
    setCreateUserDialogOpen(true);
  }, []);

  const openUserEdit = useCallback((id: string) => {
    setEditUserDialogOpen(true);
    setSelectedUserId(id);
  }, []);

  const closeUserEdit = useCallback(() => {
    setEditUserDialogOpen(false);
    setSelectedUserId(null);
  }, []);

  const openUserDetails = useCallback((id: string) => {
    setSelectedUserId(id);
    setUserDetailsOpen(true);
  }, []);

  const closeUserDetails = useCallback(() => {
    setSelectedUserId(null);
    setUserDetailsOpen(false);
  }, []);

  return (
    <div className={classes.root}>
      <UsersList openUserCreate={openUserCreate} openUserDetails={openUserDetails} openUserEdit={openUserEdit} />
      <CreateUserPanel open={isCreateUserDialogOpen} onClose={closeUserCreate} />
      {selectedUserId && <EditUserPanel userId={selectedUserId} open={isEditUserDialogOpen} onClose={closeUserEdit} />}
      {selectedUserId && (
        <UserDetailsPanel userId={selectedUserId} open={isUserDetailsOpen} onClose={closeUserDetails} />
      )}
    </div>
  );
}
