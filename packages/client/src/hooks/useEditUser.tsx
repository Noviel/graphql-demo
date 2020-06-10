import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { useButtonClick } from './useEventButtonClick';

export const EDIT_USER = gql`
  mutation EditUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

export function useEditUser(id: string, name: string, email: string) {
  const [editUser, info] = useMutation(EDIT_USER, {
    variables: {
      id,
      input: {
        name,
        email,
      },
    },
  });

  const editUserClickHandler = useButtonClick((e) => editUser(), [editUser]);

  return [editUser, info, editUserClickHandler] as const;
}
