import React, { useState } from 'react';

type Props = {};

const useSelect = <T,>() => {
  const [value, setValue] = useState<T | undefined>();

  const handleChange = (value: T | undefined) => {
    setValue(value);
  };

  return {
    value,
    handleChange
  };
};

export default useSelect;
