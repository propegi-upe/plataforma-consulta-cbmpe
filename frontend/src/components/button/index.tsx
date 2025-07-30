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
    | 'ghost'
    | 'outlineAzul'
    | 'filledAzul';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  disabled,
  ...props
}) => {
  const baseStyle = 'px-4 py-2 rounded-lg font-medium shadow-md transition-all';

  // Adicione as classes para o estado desabilitado
  const disabledStyle = 'bg-[#C6C7CA] text-white cursor-not-allowed hover:brightness-100';

  const variants = {
    primary: 'bg-primary text-white cursor-pointer hover:brightness-90',
    secondary: 'bg-secondary text-white cursor-pointer hover:brightness-95',
    danger: 'bg-danger text-white cursor-pointer hover:brightness-90',
    success: 'bg-success text-white cursor-pointer hover:brightness-90',
    warning: 'bg-warning text-white cursor-pointer hover:brightness-90',
    white: 'bg-white text-dark border hover:!bg-[#a1a1a1] cursor-pointer',
    gray: 'bg-gray-200 text-dark border hover:!bg-[#e6f3ff] cursor-pointer',
    ghost: 'bg-white border border-blue-600 text-dark border hover:!bg-gray-300 cursor-pointer',
    outline: 'bg-white cursor-pointer shadow-none border',
    filledAzul: 'bg-[#4897FA] text-white cursor-pointer',
    outlineAzul: 'bg-white text-[#4897FA] cursor-pointer shadow-none border border-[#4897FA]',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${disabled ? disabledStyle : variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
