import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { User } from '@graphql-demo/core/types';
import { USERS_LIST } from 'src/queries';
import { useButtonClick } from './useEventButtonClick';

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export function useCreateUser(name: string, email: string) {
  const [createUser, info] = useMutation(CREATE_USER, {
    variables: {
      input: {
        name,
        email,
      },
    },
    update(cache, { data: { createUser } }) {
      const { users } = cache.readQuery<{ users: User[] }>({ query: USERS_LIST });

      cache.writeQuery({
        query: USERS_LIST,
        data: {
          users: users.concat(createUser),
        },
      });
    },
  });

  const createUserClickHandler = useButtonClick((e) => createUser(), [createUser]);

  return [createUser, info, createUserClickHandler] as const;
}
