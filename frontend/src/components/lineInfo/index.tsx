import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  description?: string;
}

const LineInfo = React.forwardRef<HTMLInputElement, InputProps>(
  ({ title, description, ...rest }, ref) => {
    return (
      <div className="px-6 pt-6">
        <h1 className="mb-5 font-bold text-xl text-start text-white">{title}</h1>
        <p className="text-white text-sm mb-5">{description}</p>
      </div>
    );
  }
);

LineInfo.displayName = 'LineInfo';

export default LineInfo;
