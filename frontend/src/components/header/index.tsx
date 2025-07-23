'use client';

import React from 'react';
import Voltar from '@/assets/arrow-left.svg';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/logo.png';

interface Props {}

const Header: React.FC<Props> = ({}) => {
  const logado = false;
  const router = useRouter();
  const pathname = usePathname();

  const handleVoltar = () => {
    router.back();
  };

  if (pathname === '/' && logado) {
    return (
      <div className="flex items-center justify-between bg-primary text-white px-6 h-[50px] pt-2">
        <Image src={Logo} alt="Logo" width={36} height={36} />
        <span>Menu</span>
      </div>
    );
  }

  if (pathname === '/' && !logado) {
    return (
      <div className="flex items-center justify-between bg-primary text-white px-6 h-[50px] pt-2" />
    );
  }

  if (pathname !== '/') {
    return (
      <div className="flex items-center justify-between bg-primary text-white px-6 h-[50px] pt-2">
        <Image
          src={Voltar}
          alt="Voltar"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={handleVoltar}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-primary text-white px-6 h-[50px] pt-2" />
  );
};

export default Header;
