import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
  id: string;
};

export const UserDetails = ({ id }: UserDetailsProps) => {
  const { loading, error, data } = useQuery(USER_DETAILS, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { name, email } = data;

  return (
    <div key={id}>
      {name} {email}
    </div>
  );
};
