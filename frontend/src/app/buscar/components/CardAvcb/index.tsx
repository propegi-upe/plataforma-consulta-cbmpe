import StatusChip from '@/components/statusChip';
import { Avcb } from '@/types/cardsolicitacao';
import { formatarData } from '@/utils/formData';
import { useRouter } from 'next/navigation';
import React from 'react';

type CardAvcbProps = {
  key: number;
  item: Avcb;
};

export default function CardAvcb({ item }: CardAvcbProps) {
  const { nomeFantasia, endereco, validade } = item;
  const router = useRouter();
  const validadeBgColor = new Date(validade) < new Date() ? 'bg-gray' : 'bg-statusValidade1';
  const validadeCircleColor =
    new Date(validade) < new Date() ? 'bg-gray-300' : 'bg-statusValidade10';
  const validadeBorderColor =
    new Date(validade) < new Date() ? 'border-gray-300' : 'border-statusValidade10';
  const borda = `border-l-[10px] ${validadeBorderColor || 'border-gray-300'}`;

  const dataFormatada = formatarData(validade);

  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 mb-4 ${borda} text-dark cursor-pointer hover:shadow-lg transition-all`}
      onClick={() => router.push(`/buscar/${item.id}`)}
    >
      <div className="mb-4">
        <span>❤️</span>
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
  );
}
