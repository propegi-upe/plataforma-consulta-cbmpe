import React, { useRef, useEffect } from 'react';
import Button from '../button';
import ButtonGov from '../buttonGov';
import { useUserContext } from '@/contexts';

type ModalFavoritarProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  setFavorite: (value: boolean) => void;
};

export default function ModalFavoritar({
  open,
  onClose,
  children,
  setFavorite,
}: ModalFavoritarProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isUserAuthenticated } = useUserContext();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div
        ref={modalRef}
        className="w-screen bg-gray rounded-t-3xl p-6 shadow-lg animate-modalFavoritar relative"
        style={{ minHeight: '230px', maxHeight: '40vh' }}
      >
        {children || (
          <div className="text-center flex flex-col items-center text-dark">
            <div className="bg-gray-200 w-25 h-2 rounded mb-8" />
            {isUserAuthenticated ? (
              <>
                <span>Tem certeza que deseja remover esta solicitação do seus favoritos?</span>
                <div className="flex flex-row gap-4">
                  <Button
                    variant="outlineAzul"
                    className="text-sm h-[40px] translate-y-[25px]"
                    onClick={() => {
                      setFavorite && setFavorite(false);
                      onClose();
                    }}
                  >
                    Sim, remover
                  </Button>
                  <Button
                    variant="filledAzul"
                    className="text-sm h-[40px] translate-y-[25px]"
                    onClick={onClose}
                  >
                    Não remover
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span>
                  Entre com o gov.br para conseguir{' '}
                  <strong>favoritar e ter acesso mais fácil</strong> à solicitações e AVCB dos
                  estabelecimentos de Pernambuco
                </span>
                <ButtonGov className="border-none w-full mt-4" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
