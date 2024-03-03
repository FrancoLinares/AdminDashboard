import { Select, SelectItem } from '@tremor/react';
import useSelect from 'hooks/useSelect';

type Props = {
  id: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[] | [];
  value: string | undefined;
  handleChange: (value: string) => void;
  errorMessage?: string | false | undefined;
};

export default function SelectCustom({
  id,
  label,
  placeholder,
  options,
  value,
  handleChange,
  errorMessage
}: Props) {
  return (
    <div className="mx-auto max-w-xs">
      <label
        htmlFor={id}
        className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
      >
        {label}
      </label>
      <Select
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
          <SelectItem value={option.value}>{option.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
