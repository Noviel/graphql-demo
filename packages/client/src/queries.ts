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

export const GET_USER_DETAILS = gql`
  query GetUserDetails($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;
