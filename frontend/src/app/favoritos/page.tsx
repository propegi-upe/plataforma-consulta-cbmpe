'use client';

import { LineInfo } from '@/components';
import Filtros from './components/Filtros';
import { useSearchParams } from 'next/navigation';

export default function Favorites() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  return (
    <>
      <div className="bg-primary">
        <LineInfo
          title={
            type === 'solicitacao' ? `Solicitações de projetos favoritados` : 'AVCBs favoritados'
          }
          description={
            type === 'solicitacao'
              ? 'Tenha acesso a todas as solicitações que você marcou como favoritas.'
              : 'Tenha acesso a todos os Atestados de vistoria  que você marcou como favoritos.'
          }
          className="pb-6"
        />
      </div>

      <>
        <div className="pt-12 px-6 flex gap-4">
          <Filtros />
        </div>
      </>
    </>
  );
}
