'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import favoriteOutline from '@/assets/favoriteOutline.svg';
import { ModalFavorite } from '@/components';

type Props = {
  title: string;
};

export default function HeadDetails({ title }: Props) {
  const [modalFavoriteOpen, setModalFavoriteOpen] = useState(false);

  return (
    <>
      <div className="bg-primary h-32 w-full">
        <div className="px-6 pt-6 flex flex-row items-center justify-between">
          <span className="font-bold text-xl text-start text-white">{title}</span>
          <Image
            src={favoriteOutline}
            alt="favoriteOutline"
            width={25}
            height={25}
            className="cursor-pointer hover:opacity-80"
            onClick={(e) => {
              e.stopPropagation();
              setModalFavoriteOpen(true);
            }}
          />
        </div>
      </div>
      <ModalFavorite open={modalFavoriteOpen} onClose={() => setModalFavoriteOpen(false)} />
    </>
  );
}
