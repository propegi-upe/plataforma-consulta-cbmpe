import StatusChip from '@/components/statusChip';
import { Avcb } from '@/types/cardsolicitacao';
import { formatarData } from '@/utils/formData';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import favoriteOutline from '@/assets/favoriteOutline.svg';
import favoriteFilled from '@/assets/favoriteFilled.svg';
import ModalFavoritar from '@/components/modalFavorite';
import { useUserContext } from '@/contexts';

type CardAvcbProps = {
  key: number;
  item: Avcb;
};

export default function CardAvcb({ item }: CardAvcbProps) {
  const { isUserAuthenticated } = useUserContext();
  const [favorite, setFavorite] = useState(false);
  const { nomeFantasia, endereco, validade } = item;
  const router = useRouter();
  const validadeBgColor = new Date(validade) < new Date() ? 'bg-gray' : 'bg-statusValidade1';
  const validadeCircleColor =
    new Date(validade) < new Date() ? 'bg-gray-300' : 'bg-statusValidade10';
  const validadeBorderColor =
    new Date(validade) < new Date() ? 'border-gray-300' : 'border-statusValidade10';
  const borda = `border-l-[10px] ${validadeBorderColor || 'border-gray-300'}`;
  const [modalFavoriteOpen, setModalFavoriteOpen] = useState(false);

  const dataFormatada = formatarData(validade);

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-sm p-4 mb-4 ${borda} text-dark cursor-pointer hover:shadow-lg transition-all`}
        onClick={() => router.push(`/buscar/${item.id}?type=avcb`)}
      >
        <div className="mb-4">
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
        <div>
          <strong>{nomeFantasia}</strong>
        </div>
        <div>
          <span>{endereco}</span>
        </div>
        <div className="flex flex-row items-center justify-between mt-6">
          <StatusChip
            status={`Validade ${dataFormatada}`}
            bgColor={validadeBgColor}
            circleColor={validadeCircleColor || 'bg-gray-300'}
          />
        </div>
      </div>
      <ModalFavoritar
        open={modalFavoriteOpen}
        onClose={() => setModalFavoriteOpen(false)}
        setFavorite={setFavorite}
      />
    </>
  );
}
