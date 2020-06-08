import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { UsersListItem } from './UsersListItem';

const USERS_LIST = gql`
  {
    users(skip: 0, limit: 10) {
      id
      name
      email
    }
  }
`;

export const UsersList = () => {
  const { loading, error, data } = useQuery(USERS_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.users.map((user) => {
        return <UsersListItem key={user.id} user={user} />;
      })}
    </div>
  );
};
