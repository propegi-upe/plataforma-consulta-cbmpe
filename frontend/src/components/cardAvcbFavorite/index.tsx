'use client';

import { Avcb } from '@/types/cardsolicitacao';
import { formatarData } from '@/utils/formData';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import favoriteOutline from '@/assets/favoriteOutline.svg';
import favoriteFilled from '@/assets/favoriteFilled.svg';
import { useUserContext } from '@/contexts';
import { StatusChip } from '../statusChip';
import { ModalFavorite } from '../modalFavorite';
import { ModalPortal } from '../modalPortal';

type CardAvcbProps = {
  item: Avcb;
};

const CardAvcbFavorite: React.FC<CardAvcbProps> = ({ item }) => {
  const { isUserAuthenticated } = useUserContext();
  const [favorite, setFavorite] = useState(false);
  const { nomeFantasia, endereco, validade } = item;
  const router = useRouter();
  const validadeBgColor = new Date(validade) < new Date() ? 'bg-gray' : 'bg-statusValidade1';
  const validadeCircleColor =
    new Date(validade) < new Date() ? 'bg-gray-300' : 'bg-statusValidade10';
  const [modalFavoriteOpen, setModalFavoriteOpen] = useState(false);

  const dataFormatada = formatarData(validade);

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-sm p-4 mb-4 text-dark cursor-pointer hover:shadow-lg transition-all ml-2 max-w-[250px]`}
        onClick={() => router.push(`/buscar/${item.id}?type=avcb`)}
      >
        <div className="flex flex-row items-center justify-between mb-2">
          <StatusChip
            className="py-3 px-4"
            status={`Validade ${dataFormatada}`}
            bgColor={validadeBgColor}
            circleColor={validadeCircleColor || 'bg-gray-300'}
            isCircle={false}
          />
        </div>
        <div>
          <strong>{nomeFantasia}</strong>
        </div>
        <div>
          <span className="text-sm">{endereco}</span>
        </div>
        <div className="flex items-center justify-end mt-4">
          <Image
            src={favorite ? favoriteFilled : favoriteOutline}
            alt="favoriteOutline"
            width={25}
            height={25}
            onClick={(e) => {
              e.stopPropagation();
              if (isUserAuthenticated) {
                if (favorite) {
                  setModalFavoriteOpen(true);
                } else {
                  setFavorite(!favorite);
                }
                return;
              }
              setModalFavoriteOpen(true);
            }}
            className="cursor-pointer hover:opacity-80"
          />
        </div>
      </div>
      <ModalPortal>
        <ModalFavorite
          open={modalFavoriteOpen}
          onClose={() => setModalFavoriteOpen(false)}
          setFavorite={setFavorite}
        />
      </ModalPortal>
    </>
  );
};

export { CardAvcbFavorite };
