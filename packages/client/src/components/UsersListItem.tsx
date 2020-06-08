import React from 'react';

type UsersListItemProps = {
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export const UsersListItem = ({ user }: UsersListItemProps) => {
  const { id, name, email } = user;

  return (
    <div key={id}>
      {name} {email}
    </div>
  );
};
