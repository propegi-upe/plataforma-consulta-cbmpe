'use client';

import React from 'react';
import { useUserContext } from '@/contexts';
import { useRouter } from 'next/navigation';

interface ButtonGovProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonGov: React.FC<ButtonGovProps> = ({ className = '', type = 'button', ...props }) => {
  const baseStyle =
    'px-4 py-2 rounded-lg font-medium shadow-md transition-all cursor-pointer hover:brightness-110 bg-white text-dark hover:!bg-[#a1a1a1] flex items-center gap-2 justify-center text-sm h-[50px]';
  const { setUser } = useUserContext();
  const router = useRouter();

  const handleLogin = () => {
    // const mockUser = {
    //   name: 'Thiago',
    //   email: 'thiago@example.com',
    // };
    // if (setUser) {
    //   setUser(mockUser);
    // }
    router.push('/entrar');
  };

  return (
    <button type={type} className={`${baseStyle}  ${className}`} {...props} onClick={handleLogin}>
      <span>Entre com seu e-mail</span>
    </button>
  );
};

export { ButtonGov };
