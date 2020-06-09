import React from 'react';
import { Button } from '@material-ui/core';

interface UserDetailsPanelProps {
  id: string;
  onHideUserDetails(): void;
}

export const UserDetailsPanel = ({ id, onHideUserDetails }: UserDetailsPanelProps) => {
  return (
    <div>
      user details {id}
      <Button onClick={onHideUserDetails}>hide</Button>
    </div>
  );
};
