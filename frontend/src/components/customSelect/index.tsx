import React from 'react';

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type CustomSelectProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  className = 'p-2 rounded w-[85px] h-[42px] bg-graySecondary font-medium rounded-[20px] focus:outline-none focus:ring-0 text-dark',
}) => (
  <select value={value} onChange={onChange} className={className}>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value} disabled={opt.disabled}>
        {opt.label}
      </option>
    ))}
  </select>
);

export { CustomSelect };
