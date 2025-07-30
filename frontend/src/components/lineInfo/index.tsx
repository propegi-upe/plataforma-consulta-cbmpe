import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  description?: string;
  className?: string;
}

const LineInfo = React.forwardRef<HTMLInputElement, InputProps>(
  ({ title, description, className, ...rest }, ref) => {
    return (
      <div className={`px-6 pt-6 ${className}`}>
        <h1 className="mb-2 font-bold text-xl text-start text-white">{title}</h1>
        <p className="text-white text-sm mb-5">{description}</p>
      </div>
    );
  }
);

LineInfo.displayName = 'LineInfo';

export { LineInfo };
