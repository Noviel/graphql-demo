import React from 'react';

import { isEmail } from '@graphql-demo/core/src/email';

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

  const [createUser, { loading, error }] = useCreateUser(name, email);

  const submit: FormSubmitEvent = async (event) => {
    event.preventDefault();

    if (!isEmail(email)) {
      return;
    }

    try {
      await createUser();
      onClose();
    } catch (e) {}
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
