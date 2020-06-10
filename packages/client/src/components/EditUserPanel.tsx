import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { User } from '@graphql-demo/core/types';
import { GET_USER_DETAILS } from 'src/queries';
import { FormSubmitEvent } from 'src/types';
import { useDeleteUser } from 'hooks/useDeleteUser';
import { useEditUser } from 'hooks/useEditUser';
import { useButtonClick } from 'hooks/useEventButtonClick';
import { useInputControl } from 'hooks/useInputControl';
import { UserDetailsPanelBase } from './UserModifyPanelBase';

type EditUserDialogProps = {
  userId: string;
  open: boolean;
  onClose(): void;
};

export const EditUserPanel = ({ userId, open, onClose }: EditUserDialogProps) => {
  const [name, handleChangeName, setName] = useInputControl('');
  const [email, handleChangeEmail, setEmail] = useInputControl('');

  const { data, loading: loadingDetails } = useQuery<{ user: User }>(GET_USER_DETAILS, {
    variables: {
      id: userId,
    },
  });

  const [editUser, { loading: loadingEdit }] = useEditUser(userId, name, email);
  const [deleteUser] = useDeleteUser(data?.user.id);

  useEffect(() => {
    if (!data) {
      return;
    }
    setName(data.user.name);
    setEmail(data.user.email);
  }, [data]);

  const submit: FormSubmitEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await editUser();
    onClose();
  };

  const handleDeleteUser = useButtonClick(() => {
    deleteUser();
    onClose();
  }, [deleteUser, onClose]);

  return (
    <UserDetailsPanelBase
      title="Edit user"
      actionText="Save"
      userId={userId}
      userName={name}
      userEmail={email}
      onChangeName={handleChangeName}
      onChangeEmail={handleChangeEmail}
      submit={submit}
      loading={loadingDetails || loadingEdit}
      onDelete={handleDeleteUser}
      open={open}
      onClose={onClose}
    />
  );
};
