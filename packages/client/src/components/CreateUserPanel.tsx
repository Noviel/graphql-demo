import React from 'react';

import { FormSubmitEvent } from 'src/types';
import { useCreateUser } from 'src/hooks/useCreateUser';
import { useInputControl } from 'hooks/useInputControl';
import { UserDetailsPanelBase } from './UserModifyPanelBase';

type CreateUserDialogProps = {
  open: boolean;
  onClose(): void;
};

export const CreateUserPanel = ({ open, onClose }: CreateUserDialogProps) => {
  const [name, handleChangeName] = useInputControl('');
  const [email, handleChangeEmail] = useInputControl('');

  const [createUser,{ loading }] = useCreateUser(name, email);

  const submit: FormSubmitEvent = async (event) => {
    event.preventDefault();
    await createUser();
    onClose();
  };

  return (
    <UserDetailsPanelBase
      actionText="Create"
      submit={submit}
      loading={loading}
      userName={name}
      userEmail={email}
      open={open}
      onClose={onClose}
      onChangeName={handleChangeName}
      onChangeEmail={handleChangeEmail}
    />
  );
};
