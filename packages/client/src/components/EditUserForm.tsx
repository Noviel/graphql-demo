import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { User } from 'types';

const EDIT_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

type EditUserFormProps = {
  user: User;
};

export const EditUserForm = ({ user: { email, id, name } }: EditUserFormProps) => {
  return (
    <div key={id}>
      {name} {email}
    </div>
  );
};
