import { gql } from 'apollo-boost';

export const USERS_LIST = gql`
  {
    users(skip: 0, limit: 10) {
      id
      name
      email
    }
  }
`;
