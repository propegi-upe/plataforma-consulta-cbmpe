'use client';

import { Solicitacao } from '@/types/cardsolicitacao';
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

const statusColorBorder: { [key: string]: string } = {
  'Em exigência': 'border-requirement',
  Aprovado: 'border-green-500',
  Reprovado: 'border-orange-500',
  'Em análise': 'border-blue-500',
};

const statusColorChip: { [key: string]: string } = {
  'Em exigência': 'bg-juridico',
  Aprovado: 'bg-green-500',
  Reprovado: 'bg-orange-500',
  'Em análise': 'bg-blue-500',
};
const statusColorCircle: { [key: string]: string } = {
  'Em exigência': 'bg-requirement',
  Aprovado: 'bg-green-500',
  Reprovado: 'bg-orange-500',
  'Em análise': 'bg-blue-500',
};

type CardSolicitacaoProps = {
  item: Solicitacao;
};

const CardSolicitacaoFavorite: React.FC<CardSolicitacaoProps> = ({ item }) => {
  const { isUserAuthenticated } = useUserContext();
  const [favorite, setFavorite] = useState(false);
  const { protocolo, dataAbertura, nome, cnpj, status } = item;
  const borda = `border-l-[10px] ${statusColorBorder[status] || 'border-gray-300'}`;
  const router = useRouter();
  const [modalFavoriteOpen, setModalFavoriteOpen] = useState(false);

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-sm p-4 mb-4 ${borda} text-dark cursor-pointer hover:shadow-lg transition-all ml-2 max-w-[250px]`}
        onClick={() => router.push(`/buscar/${item.id}?type=solicitacao`)}
      >
        <div className="flex flex-row items-center justify-between mb-4">
          <StatusChip
            status={status}
            bgColor={statusColorChip[status] || 'bg-gray-300'}
            circleColor={statusColorCircle[status] || 'bg-gray-300'}
          />
        </div>

        <div className="flex flex-col">
          <strong>Protocolo</strong>
          <span>{protocolo}</span>
        </div>

        <div className="flex flex-col">
          <strong>Data de Abertura</strong>
          <span>{formatarData(dataAbertura)}</span>
        </div>

        <div className="flex flex-col">
          <strong>Nome</strong>
          <span>{nome}</span>
        </div>

        <div className="flex flex-col ">
          <strong>CNPJ</strong>
          <span>{cnpj}</span>
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

export { CardSolicitacaoFavorite };
