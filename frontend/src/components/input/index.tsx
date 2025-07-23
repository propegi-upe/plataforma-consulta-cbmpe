import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, ...rest }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center ">
            <label htmlFor={id} className="text-sm font-medium text-dark mb-1">
              {label}
            </label>
          </div>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg text-sm text-dark bg-white placeholder-gray-400 focus:outline-none transition
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'}
          `}
          {...rest}
        />
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
