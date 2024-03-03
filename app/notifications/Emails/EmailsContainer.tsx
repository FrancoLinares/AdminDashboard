import { Title } from '@tremor/react';
import React from 'react';
import { TITLE } from './constants';

type Props = {};

const EmailsContainer = ({}: Props) => {
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>{TITLE}</Title>
      <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Emails
      </p>
    </div>
  );
};

export default EmailsContainer;
