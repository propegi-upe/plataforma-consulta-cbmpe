'use client';

import { StatusChip } from '@/components';
import React from 'react';

type Props = {};

export default function CardRequest({}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm px-4 mb-4 text-dark transition-all mt-8">
      <div className="flex justify-center translate-y-[-25px]">
        <StatusChip status="Em exigência" bgColor="bg-juridico" circleColor="bg-requirement" />
      </div>
      <div className="translate-y-[-20px]">
        <div className="flex flex-col justify-center items-center mb-6 text-sm font-semibold">
          <span>Desde 18/02/2025 - 10:53 h</span>
        </div>
        <span className="text-sm">
          É necessário que o <strong>solicitante</strong> anexe a documentação necessária para ser
          iniciada a triagem de documentos por parte do CBMPE.
        </span>
        <div className="h-4" />
      </div>
    </div>
  );
}
