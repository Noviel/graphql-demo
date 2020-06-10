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
  const [name, handleChangeName, setName] = useInputControl('');
  const [email, handleChangeEmail, setEmail] = useInputControl('');

  const [createUser, { loading }] = useCreateUser(name, email);

  const submit: FormSubmitEvent = async (event) => {
    event.preventDefault();

    try {
      await createUser();
      onClose();
    } catch (e) {}
  };

  const close = () => {
    setName('');
    setEmail('');
    onClose();
  };

  return (
    <UserDetailsPanelBase
      title="Create user"
      actionText="Create"
      submit={submit}
      loading={loading}
      userName={name}
      userEmail={email}
      open={open}
      onClose={close}
      onChangeName={handleChangeName}
      onChangeEmail={handleChangeEmail}
    />
  );
};
