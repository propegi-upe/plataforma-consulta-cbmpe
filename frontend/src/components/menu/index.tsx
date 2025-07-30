'use client';

import React from 'react';
import Image from 'next/image';
import CloseIcon from '@/assets/close.svg';
import { useUserContext } from '@/contexts';
import { useRouter } from 'next/navigation'; // Importação do router
import { Button } from '../button';

type MenuProps = {
  aberto: boolean;
  onClose: () => void;
};

const Menu: React.FC<MenuProps> = ({ aberto, onClose }) => {
  const { clearUser } = useUserContext();
  const router = useRouter(); // Utilizando o hook

  const onLogout = () => {
    if (clearUser) {
      clearUser();
    }
    onClose();
  };

  // Agora ListaMenu está dentro do componente para acessar o router
  const ListaMenu = [
    {
      label: 'Início',
      onClick: () => router.push('/'),
    },
    {
      label: 'Solicitações favoritas',
      onClick: () => router.push('/favoritos?type=solicitacao'),
    },
    {
      label: 'AVCBs favoritos',
      onClick: () => router.push('/favoritos?type=avcb'),
    },
    {
      label: 'Site do CBMPE',
      onClick: () => {
        window.open('https://www.bombeiros.pe.gov.br/', '_blank');
      },
    },
  ];

  return (
    <>
      {/* Fundo escuro ao abrir o menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${aberto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Menu lateral */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 flex flex-col transition-transform duration-200 ${aberto ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5">
          <span className="font-bold text-lg text-dark">Menu</span>
          <button
            aria-label="Fechar menu"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Image src={CloseIcon} alt="Fechar" width={15} height={15} />
          </button>
        </div>

        {/* Lista de itens */}
        <nav className="flex-1 p-5">
          <ul className="space-y-4">
            {ListaMenu.map((item) => (
              <li key={item.label} className="border-b border-gray-200 last:border-none">
                <button
                  className="w-full text-left text-dark font-medium py-2 px-3 rounded hover:bg-primary/10 transition"
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé  */}
        <div className="p-5">
          <Button variant="outline" onClick={onLogout} className="w-full text-danger">
            Sair da conta
          </Button>
        </div>
      </aside>
    </>
  );
};

export { Menu };
