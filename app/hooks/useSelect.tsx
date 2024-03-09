import React, { useState } from 'react';

type Props = {};

const useSelect = () => {
  const [value, setValue] = useState<string | undefined>();

  const handleChange = (value: string | undefined) => {
    setValue(value);
  };

  return {
    value,
    handleChange
  };
};

export default useSelect;
