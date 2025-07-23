import StatusChip from '@/components/statusChip';
import { Solicitacao } from '@/types/cardsolicitacao';
import { formatarData } from '@/utils/formData';
import { useRouter } from 'next/navigation';
import React from 'react';

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
  key: number;
  item: Solicitacao;
};

export default function CardSolicitacao({ item }: CardSolicitacaoProps) {
  const { protocolo, dataAbertura, nome, cnpj, status } = item;
  const borda = `border-l-[10px] ${statusColorBorder[status] || 'border-gray-300'}`;
  const router = useRouter();

  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 mb-4 ${borda} text-dark cursor-pointer hover:shadow-lg transition-all`}
      onClick={() => router.push(`/buscar/${item.id}`)}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <strong>Protocolo</strong>
          <span>{protocolo}</span>
        </div>
        <div className="flex flex-col">
          <strong>Data de Abertura</strong>
          <span>{formatarData(dataAbertura)}</span>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <strong>Nome</strong>
          <span>{nome}</span>
        </div>
      </div>
      <div>
        <div className="flex flex-col ">
          <strong>CNPJ</strong>
          <span>{cnpj}</span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between mt-4">
        <StatusChip
          status={status}
          bgColor={statusColorChip[status] || 'bg-gray-300'}
          circleColor={statusColorCircle[status] || 'bg-gray-300'}
        />
        <div>
          <span>❤️</span>
        </div>
      </div>
    </div>
  );
}
