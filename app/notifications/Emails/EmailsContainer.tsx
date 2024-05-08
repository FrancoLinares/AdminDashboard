import { Title } from '@tremor/react';
import React from 'react';
import { EMAIL_BODY, TITLE } from './constants';
import EmailForm from './Form';

type Props = {};

const EmailsContainer = ({}: Props) => {
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>{TITLE}</Title>
      <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {EMAIL_BODY}
      </p>
      <div>
        <EmailForm />
      </div>
    </div>
  );
};

export default EmailsContainer;
