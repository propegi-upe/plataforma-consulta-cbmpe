import Button from '@/components/button';
import React, { useRef, useEffect } from 'react';

type ModalFavoritarProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function ModalCustom({ open, onClose, children }: ModalFavoritarProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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
        {children}
      </div>
    </div>
  );
}
