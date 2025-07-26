import React from 'react';
import gov from '@/assets/gov.png';
import Image from 'next/image';
import { useUserContext } from '@/contexts';

interface ButtonGovProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonGov: React.FC<ButtonGovProps> = ({ className = '', type = 'button', ...props }) => {
  const baseStyle =
    'px-4 py-2 rounded-lg font-medium shadow-md transition-all cursor-pointer hover:brightness-110 bg-white text-dark hover:!bg-[#a1a1a1] flex items-center gap-2 justify-center text-sm h-[50px]';
  const { setUser } = useUserContext();

  const handleLogin = () => {
    const mockUser = {
      name: 'Fulano de Tal',
      email: 'fulano@example.com',
    };
    if (setUser) {
      setUser(mockUser);
    }
  };

  return (
    <button type={type} className={`${baseStyle}  ${className}`} {...props} onClick={handleLogin}>
      <span>Entrar com o</span>
      <Image src={gov} alt="gov.br" width={50} height={50} />
    </button>
  );
};

export default ButtonGov;
