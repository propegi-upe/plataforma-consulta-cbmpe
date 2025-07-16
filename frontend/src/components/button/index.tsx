import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'white'
    | 'gray'
    | 'outline'
    | 'ghost';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyle =
    'px-4 py-2 rounded-lg font-medium shadow-md transition-all cursor-pointer hover:brightness-110';

  const variants = {
    primary: 'bg-primary text-white hover:!opacity-90',
    secondary: 'bg-secondary text-white hover:!opacity-90',
    danger: 'bg-danger text-white hover:!opacity-90',
    success: 'bg-success text-white hover:!opacity-90',
    warning: 'bg-warning text-white hover:!opacity-90',
    white: 'bg-white text-dark border hover:!bg-[#a1a1a1]',
    gray: 'bg-gray-200 text-dark border hover:!bg-[#e6f3ff]',
    ghost: 'bg-white border border-blue-600 text-dark border hover:!bg-gray-300',
    outline: 'bg-[#e6f3ff] text-dark hover:!opacity-90',
  };

  return (
    <button type={type} className={`${baseStyle} ${variants[variant]}  ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
