'use client';

import { CardAvcbFavorite, CardSolicitacao, CardSolicitacaoFavorite, LineInfo } from '@/components';
import Filtros from './components/Filtros';
import { useSearchParams } from 'next/navigation';
import { mockAVCB, mockSolicitacoes } from '@/utils/searchMocks';
import favorite from '@/assets/return-list-favorite.svg';
import Image from 'next/image';

export default function Favorites() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const isSolicitacao = type === 'solicitacao';
  const isAvcb = type === 'avcb';

  return (
    <>
      <div className="bg-primary">
        <LineInfo
          title={isSolicitacao ? `Solicitações de projetos favoritados` : 'AVCBs favoritados'}
          description={
            isSolicitacao
              ? 'Tenha acesso a todas as solicitações que você marcou como favoritas.'
              : 'Tenha acesso a todos os Atestados de vistoria  que você marcou como favoritos.'
          }
          className="pb-6"
        />
      </div>

      <div className="px-6">
        <div className="pt-12 flex gap-2 mb-6">
          <Filtros />
        </div>
        {isSolicitacao &&
          (mockSolicitacoes.length === 0 ? (
            <div className="flex flex-col items-center justify-center  pt-24">
              <div className="mb-8">
                <Image src={favorite} alt="buscar" width={168} />
              </div>
              <p className="text-[#d6d6d6] font-semibold text-center mb-4">
                Você ainda não tem solicitações favoritas
              </p>
            </div>
          ) : (
            <div className="display-flex">
              {mockSolicitacoes.map((item) => (
                <CardSolicitacaoFavorite key={`solicitacao-${item.id}`} item={item} />
              ))}
            </div>
          ))}
        {isAvcb &&
          (mockAVCB.length === 0 ? (
            <div className="flex flex-col items-center justify-center  pt-24">
              <div className="mb-8">
                <Image src={favorite} alt="buscar" width={168} />
              </div>
              <p className="text-[#d6d6d6] font-semibold text-center mb-4">
                Você ainda não tem AVCB favoritas
              </p>
            </div>
          ) : (
            <div className="display-flex">
              {mockAVCB.map((item) => (
                <CardAvcbFavorite key={`solicitacao-${item.id}`} item={item} className="w-full" />
              ))}
            </div>
          ))}
      </div>
    </>
  );
}
