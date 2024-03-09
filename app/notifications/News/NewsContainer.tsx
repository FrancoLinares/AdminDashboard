import { Title } from '@tremor/react';
import React from 'react';
import { NEWS_EXPLANATION, TITLE } from './constants';
import MobileNotificationForm from './Form';

type Props = {};

const NewsContainer = ({}: Props) => {
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>{TITLE}</Title>
      <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {NEWS_EXPLANATION}
      </p>
      <div className="mt-4">
        <MobileNotificationForm />
      </div>
    </div>
  );
};

export default NewsContainer;
