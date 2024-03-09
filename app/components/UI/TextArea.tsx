import React from 'react';
import { Textarea } from '@tremor/react';

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

export default function TextAreaCustom({
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
        htmlFor="text-area"
        className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
      >
        {label}
      </label>
      <Textarea
        id={'text-area'}
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
