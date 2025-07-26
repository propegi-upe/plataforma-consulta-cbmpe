'use client';

import React, { useMemo, useState } from 'react';
import Voltar from '@/assets/arrow-left.svg';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import MenuImg from '@/assets/menu.svg';
import { useUserContext } from '@/contexts/UserContext';
import Menu from '../menu';

interface Props {}

const Header: React.FC<Props> = ({}) => {
  const { loadingUser, isUserAuthenticated } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleVoltar = () => {
    router.back();
  };

  if (loadingUser) {
    return null;
  }

  if (pathname === '/' && isUserAuthenticated) {
    return (
      <div className="flex items-center justify-between bg-primary text-white px-6 h-[50px] pt-2">
        <Image src={Logo} alt="Logo" width={36} height={36} />
        <span onClick={() => setMenuAberto(true)}>
          <Image src={MenuImg} alt="Menu" width={24} height={24} />
        </span>
        <Menu aberto={menuAberto} onClose={() => setMenuAberto(false)} />
      </div>
    );
  }

  if (pathname === '/' && !isUserAuthenticated) {
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
        {isUserAuthenticated && (
          <>
            <span onClick={() => setMenuAberto(true)}>
              <Image src={MenuImg} alt="Menu" width={24} height={24} />
            </span>
            <Menu aberto={menuAberto} onClose={() => setMenuAberto(false)} />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-primary text-white px-6 h-[50px] pt-2" />
  );
};

export default Header;
