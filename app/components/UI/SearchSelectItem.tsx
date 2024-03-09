import { SearchSelect, SearchSelectItem } from '@tremor/react';
import React from 'react';

type Props = {
  id: string;
  label: string;
  helperText?: string;
  placeholder: string;
  options: { value: string; label: string }[] | [];
  value: string | undefined;
  handleChange: (value: string) => void;
  errorMessage?: string | false | undefined;
};
export default function SearchSelectItemCustom({
  id,
  label,
  helperText,
  placeholder,
  options,
  value,
  handleChange,
  errorMessage
}: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
      >
        {label}
      </label>
      <SearchSelect
        id={id}
        name={id}
        value={value}
        onValueChange={handleChange}
        className="mt-2"
        placeholder={placeholder}
        error={Boolean(errorMessage)}
        errorMessage={errorMessage || undefined}
      >
        {options.map((option) => (
          <SearchSelectItem value={option.value}>
            {option.label}
          </SearchSelectItem>
        ))}
      </SearchSelect>
      {helperText && (
        <label
          htmlFor={id}
          className="text-xs text-tremor-default text-tremor-content dark:text-dark-tremor-content"
        >
          {helperText}
        </label>
      )}
    </div>
  );
}
