import React, { useState } from 'react';

const useUIElement = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (value: string) => {
    setValue(value);
  };

  return {
    value,
    handleChange
  };
};

export default useUIElement;
