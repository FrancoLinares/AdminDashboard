import { Title } from '@tremor/react';
import React from 'react';
import { NEWS_EXPLANATION, TITLE } from './constants';

type Props = {};

const NewsContainer = ({}: Props) => {
  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>{TITLE}</Title>
      <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {NEWS_EXPLANATION}
      </p>
      <div className="mt-4">
        <div>Formulario para enviar noticia</div>
        <div>Botones para enviar noticia</div>
      </div>
    </div>
  );
};

export default NewsContainer;
