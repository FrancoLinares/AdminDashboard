import React from 'react';
import { TextInput } from '@tremor/react';

type Props = {
  value: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  errorMessage?: string | false | undefined;
  handleChange: (value: string) => void;
  // All other props
  [x: string]: any;
};

export default function TextInputCustom({
  value,
  label,
  helperText,
  placeholder,
  errorMessage,
  handleChange,
  ...restProps
}: Props) {
  return (
    <div>
      <label
        htmlFor="text-input"
        className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
      >
        {label}
      </label>
      <TextInput
        id={'text-input'}
        value={value}
        placeholder={placeholder}
        error={!!errorMessage}
        errorMessage={!!errorMessage ? errorMessage : undefined}
        onValueChange={handleChange}
        {...restProps}
      />
      {helperText && (
        <p className="text-sm text-tremor-content dark:text-dark-tremor-content">
          {helperText}
        </p>
      )}
    </div>
  );
}
