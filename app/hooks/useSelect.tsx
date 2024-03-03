import React, { useState } from 'react';
import SelectCustom from '@/components/UI/Select';

type Props = {};

const useSelect = () => {
  const [value, setValue] = useState<string | undefined>();

  const handleChange = (value: string) => {
    setValue(value);
  };

  return {
    value,
    handleChange
  };
};

export default useSelect;
