import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { User } from '@graphql-demo/core/types';
import { USERS_LIST } from 'src/queries';
import { useButtonClick } from './useEventButtonClick';

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export function useDeleteUser(id: string) {
  const [deleteUser, info] = useMutation<any>(DELETE_USER, {
    variables: {
      id,
    },
    update(cache, { data: { deleteUser } }) {
      const { users } = cache.readQuery<{ users: User[] }>({ query: USERS_LIST });
      const index = users.findIndex((user) => user.id === id);

      if (index === -1) {
        throw new Error(`UnexpectedError: deleted user with id "${id}" was not found in cache.`);
      }

      cache.writeQuery({
        query: USERS_LIST,
        data: {
          users: [...users.slice(0, index), ...users.slice(index + 1)],
        },
      });
    },
  });

  const deleteUserClickHandler = useButtonClick((e) => deleteUser(), [deleteUser]);

  return [deleteUser, deleteUserClickHandler, info] as const;
}
